// Usage (Windows, Git Bash, Linux): node scripts/test-pages-runtime.mjs
// Requires the existing dist/, functions/ and locally installed wrangler@4.156.1.
// No install, site build, deployment, browser, or requests to an existing server.
// stdout: one final JSON object; stderr: bounded failure diagnostics.
import assert from 'node:assert/strict';
import { spawn, execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { createServer } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { promisify, stripVTControlCharacters } from 'node:util';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const DIST = path.join(ROOT, 'dist');
const VERSION = '4.156.1';
const COMPATIBILITY_DATE = '2026-11-02';
const HOST = '127.0.0.1';
const BASE = '/sonic';
const START_TIMEOUT = 60_000;
const REQUEST_TIMEOUT = 10_000;
const RUN_TIMEOUT = 180_000;
const PARALLEL = 8;
const LANGUAGES = [
  { directory: '', lang: 'zh-CN', accept: 'zh-CN,zh;q=0.9' },
  { directory: 'zh-tw', lang: 'zh-TW', accept: 'zh-TW,zh;q=0.9' },
  { directory: 'en', lang: 'en', accept: 'en-US,en;q=0.9' },
  { directory: 'fr', lang: 'fr', accept: 'fr-CA,fr;q=0.9' },
  { directory: 'es', lang: 'es', accept: 'es-MX,es;q=0.9' },
  { directory: 'de', lang: 'de', accept: 'de-DE,de;q=0.9' },
  { directory: 'ja', lang: 'ja', accept: 'ja-JP,ja;q=0.9' },
  { directory: 'ko', lang: 'ko', accept: 'ko-KR,ko;q=0.9' },
  { directory: 'pt', lang: 'pt', accept: 'pt-BR,pt;q=0.9' },
  { directory: 'ru', lang: 'ru', accept: 'ru-RU,ru;q=0.9' },
];
const DOCUMENTS = [
  'project', 'interface', 'overview', 'quickstart', 'features', 'api',
  'privacy-policy', 'terms-of-service', 'acceptable-use', 'data-security',
  'sub-processors', 'open-source', 'deployment', 'development', 'search-syntax',
  'library', 'mobile', 'recommendation', 'account-security', 'data-management',
  'troubleshooting', 'key-terms',
];
const REDIRECTS = ['/sonic /sonic/ 308', '/sonic/ / 200', '/sonic/* /:splat 200'];
const CONTROL_FILES = new Set(['_redirects', '_headers', '_routes.json', '_worker.js']);
const MIME = {
  '.css': ['text/css'],
  '.js': ['application/javascript', 'text/javascript'],
  '.mjs': ['application/javascript', 'text/javascript'],
  '.json': ['application/json'],
  '.xml': ['application/xml', 'text/xml'],
  '.txt': ['text/plain'],
  '.svg': ['image/svg+xml'],
  '.png': ['image/png'],
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.gif': ['image/gif'],
  '.webp': ['image/webp'],
  '.avif': ['image/avif'],
  '.ico': ['image/x-icon', 'image/vnd.microsoft.icon'],
  '.woff': ['font/woff', 'application/font-woff'],
  '.woff2': ['font/woff2'],
  '.wasm': ['application/wasm'],
  // Pagefind's compressed index/fragment/wasm containers are NOT plain wasm.
  '.pagefind': ['application/octet-stream'],
  '.pf_meta': ['application/octet-stream'],
  '.pf_index': ['application/octet-stream'],
  '.pf_fragment': ['application/octet-stream'],
};
const docFile = (language, slug) => [language.directory, slug, 'index.html'].filter(Boolean).join('/');
const assetPath = file => `${BASE}/${file.split('/').map(encodeURIComponent).join('/')}`;
const docPath = (language, slug) => assetPath(docFile(language, slug)).replace(/index\.html$/, '');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const started = Date.now();
const abort = new AbortController();
const counts = Object.fromEntries(['languages', 'baseRedirect', 'entry', 'html', 'assets', 'noTrailingSlash', 'notFound']
  .map(name => [name, { checked: 0, passed: 0 }]));
const failureKinds = {};
const expected = new Map();
let failures = 0;
let requests = 0;
let temporary;
let child;
let childClosed = false;
let stopping = false;
let cleanedUp = false;
let ready;
let port;
let origin;
let output = '';
let invalidRedirectRules = false;
let invalidRedirectDetail = '';

function fail(kind, target, error) {
  failures++;
  failureKinds[kind] = (failureKinds[kind] || 0) + 1;
  if (failures <= 8) console.error(`[${kind}] ${target}: ${error.message || error}`);
}

async function check(kind, target, run) {
  abort.signal.throwIfAborted();
  counts[kind].checked++;
  try {
    await run();
    counts[kind].passed++;
  } catch (error) {
    fail(kind, target, error);
  }
}

async function each(items, run) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(PARALLEL, items.length) }, async () => {
    while (next < items.length && !abort.signal.aborted) await run(items[next++]);
  }));
  abort.signal.throwIfAborted();
}

async function inventory(directory, relative = '') {
  const files = [];
  for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await inventory(path.join(directory, entry.name), file));
    else {
      assert(entry.isFile(), `Unsupported non-regular build artifact: ${file}`);
      files.push(file);
    }
  }
  return files;
}

async function freePort() {
  // Reserve on loopback only. Never probe or reuse the unrelated Pages instance.
  for (;;) {
    const server = createServer();
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen({ host: HOST, port: 0, exclusive: true }, resolve);
    });
    const selected = server.address().port;
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    if (selected !== 49631) return selected;
  }
}

function capture(chunk) {
  // Keep overlap so a warning split across stdout/stderr chunks cannot be missed.
  output = (output + stripVTControlCharacters(chunk)).slice(-32_768);
  const invalid = /[^\n]*\binvalid\s+redirect\s+rules?\b[^\n]*/i.exec(output);
  if (invalid) {
    invalidRedirectRules = true;
    invalidRedirectDetail = invalid[0].trim();
  }
}

async function startRuntime(binary) {
  port = await freePort();
  origin = `http://${HOST}:${port}`;
  abort.signal.throwIfAborted();
  child = spawn(process.execPath, [
    binary, 'pages', 'dev', 'dist',
    '--ip', HOST, '--port', String(port), '--inspector-port', '0',
    '--compatibility-date', COMPATIBILITY_DATE,
    '--local-protocol=http', '--live-reload=false',
    '--show-interactive-dev-session=false',
    '--persist-to', path.join(temporary, 'state'),
  ], {
    cwd: temporary,
    shell: false,
    windowsHide: true,
    // A fresh POSIX process group; Windows cleanup targets only this child PID tree.
    detached: process.platform !== 'win32',
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
    env: {
      ...process.env,
      CI: 'true',
      NO_COLOR: '1',
      FORCE_COLOR: '0',
      WRANGLER_SEND_METRICS: 'false',
      WRANGLER_SEND_ERROR_REPORTS: 'false',
      // In this pinned release hiding the banner also skips the npm update fetch.
      WRANGLER_HIDE_BANNER: 'true',
      WRANGLER_NO_SKILLS_UPDATE_PROMPTS: 'true',
      CLOUDFLARE_CF_FETCH_ENABLED: 'false',
      WRANGLER_CI_DISABLE_CONFIG_WATCHING: 'true',
      WRANGLER_LOG_PATH: path.join(temporary, 'wrangler.log'),
      WRANGLER_CACHE_DIR: path.join(temporary, 'cache'),
    },
  });
  child.once('close', () => { childClosed = true; });
  child.once('error', error => abort.abort(error));
  child.once('exit', (code, signal) => {
    if (!stopping) abort.abort(new Error(`Owned Wrangler exited early (code=${code}, signal=${signal})`));
  });
  for (const stream of [child.stdout, child.stderr]) {
    stream.setEncoding('utf8');
    stream.on('data', capture);
  }
  // wrangler/bin/wrangler.js forwards the CLI child's DEV_SERVER_READY IPC event.
  // Never treat a successful fetch on a guessed/free port as proof of ownership.
  child.on('message', raw => {
    try {
      const message = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (message?.event === 'DEV_SERVER_READY') ready = message;
    } catch { /* Unrelated CLI IPC is not a readiness signal. */ }
  });
  const deadline = Date.now() + START_TIMEOUT;
  while (!ready) {
    abort.signal.throwIfAborted();
    if (Date.now() >= deadline) throw new Error(`No owned Wrangler ready notification within ${START_TIMEOUT}ms`);
    await sleep(50);
  }
  assert.equal(ready.ip, HOST, 'Wrangler must bind the requested loopback address');
  assert.equal(ready.port, port, 'Wrangler must bind the reserved test port, not fall back to another server');
  abort.signal.throwIfAborted();
}

async function get(requestPath, headers = {}) {
  abort.signal.throwIfAborted();
  assert(ready && child && !childClosed && child.exitCode === null && child.signalCode === null, 'Owned runtime is not alive');
  const url = new URL(requestPath, origin);
  assert(url.origin === origin && !url.username && !url.password, `Non-local HTTP target forbidden: ${url.href}`);
  requests++;
  const response = await fetch(url, {
    redirect: 'manual', // Never follow an escaped prefix or an external Location.
    headers: { 'Accept-Encoding': 'identity', ...headers },
    signal: AbortSignal.any([abort.signal, AbortSignal.timeout(REQUEST_TIMEOUT)]),
  });
  const body = Buffer.from(await response.arrayBuffer());
  return { status: response.status, headers: response.headers, body };
}

function verifyLocation(response, requestPath, expectedPath) {
  const location = response.headers.get('location');
  assert(location, 'Missing Location');
  const target = new URL(location, new URL(requestPath, origin));
  assert(target.origin === origin && !target.username && !target.password, `Location left the owned origin: ${location}`);
  assert(target.pathname.startsWith(`${BASE}/`), `Location escaped ${BASE} prefix: ${location}`);
  assert.equal(target.href, new URL(expectedPath, origin).href, `Wrong Location: ${location}`);
}

function verifyBytes(response, file) {
  const artifact = expected.get(file);
  assert(artifact, `Missing expected artifact: ${file}`);
  assert.equal(sha256(response.body), artifact.hash, `Body differs from dist/${file} (byte-exact SHA-256; no injection/rewriting allowed)`);
}

function verifyHtml(response, file, lang, status = 200) {
  assert.equal(response.status, status, `Expected HTTP ${status}, got ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  assert.equal(contentType.split(';', 1)[0].trim().toLowerCase(), 'text/html', `Wrong HTML MIME: ${contentType}`);
  assert(/(?:^|;)\s*charset\s*=\s*"?utf-8"?\s*(?:;|$)/i.test(contentType), `Missing HTTP UTF-8 charset: ${contentType}`);
  verifyBytes(response, file);
  const html = new TextDecoder('utf-8', { fatal: true }).decode(response.body);
  assert(!/\uFFFD|&#(?:0*65533|x0*fffd);/i.test(html), 'HTML contains a Unicode replacement character');
  const root = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const actualLang = root.match(/\slang\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)?.slice(1).find(value => value !== undefined);
  assert.equal(actualLang?.toLowerCase(), lang.toLowerCase(), `Wrong <html lang> in ${file}: ${actualLang}`);
  assert(/<meta\b[^>]*\bcharset\s*=\s*["']?utf-8\b/i.test(html), `Missing HTML UTF-8 declaration: ${file}`);
}

async function stopRuntime() {
  stopping = true;
  if (!child?.pid) return;
  const pid = child.pid;
  assert(Number.isInteger(pid) && pid > 0 && pid !== process.pid, 'Invalid owned child PID');
  if (process.platform === 'win32') {
    // Do not act on a potentially recycled PID after the child has already exited.
    if (child.exitCode === null && child.signalCode === null && !childClosed) {
      const taskkill = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'taskkill.exe');
      try {
        await promisify(execFile)(taskkill, ['/PID', String(pid), '/T', '/F'], { windowsHide: true, timeout: 10_000 });
      } catch (error) {
        if (!childClosed) throw error;
      }
    }
  } else {
    const signalGroup = signal => {
      try { process.kill(-pid, signal); } catch (error) { if (error.code !== 'ESRCH') throw error; }
    };
    const groupAlive = () => {
      try { process.kill(-pid, 0); return true; } catch (error) {
        if (error.code === 'ESRCH') return false;
        throw error;
      }
    };
    signalGroup('SIGTERM');
    const deadline = Date.now() + 3_000;
    while (groupAlive() && Date.now() < deadline) await sleep(50);
    if (groupAlive()) signalGroup('SIGKILL');
  }
  const deadline = Date.now() + 5_000;
  while (!childClosed && Date.now() < deadline) await sleep(50);
  assert(childClosed, `Owned Wrangler PID ${pid} did not close after cleanup`);
}

const onInterrupt = signal => abort.abort(new Error(`Interrupted by ${signal}`));
const onSigint = () => onInterrupt('SIGINT');
const onSigterm = () => onInterrupt('SIGTERM');
process.on('SIGINT', onSigint);
process.on('SIGTERM', onSigterm);
const watchdog = setTimeout(() => abort.abort(new Error(`Runtime acceptance exceeded ${RUN_TIMEOUT}ms`)), RUN_TIMEOUT);
watchdog.unref();

try {
  assert.equal(process.argv.length, 2, 'Usage: node scripts/test-pages-runtime.mjs (no external URL or port arguments)');
  assert(Number(process.versions.node.split('.')[0]) >= 22, 'Node.js >=22 is required');
  const wranglerDirectory = path.join(ROOT, 'node_modules', 'wrangler');
  const installed = JSON.parse(await fs.readFile(path.join(wranglerDirectory, 'package.json'), 'utf8'));
  assert.equal(installed.version, VERSION, `Requires locally installed wrangler@${VERSION}; never downloads a fallback`);
  const binary = path.join(wranglerDirectory, 'bin', 'wrangler.js');
  await fs.access(binary);
  assert((await fs.stat(path.join(ROOT, 'functions'))).isDirectory(), 'Existing functions/ directory is required');
  const files = await inventory(DIST);
  const documents = LANGUAGES.flatMap(language => DOCUMENTS.map(slug => ({
    file: docFile(language, slug), url: docPath(language, slug), lang: language.lang,
  })));
  const htmlFiles = files.filter(file => /\.html?$/i.test(file));
  assert.equal(documents.length, 220, 'The required matrix must contain 220 documents');
  assert.deepEqual([...htmlFiles].sort(), [...documents.map(item => item.file), 'index.html', '404.html'].sort(), 'Expected exactly 220 documents + index.html + 404.html');
  for (const location of [path.join(ROOT, 'public', '_redirects'), path.join(DIST, '_redirects')]) {
    const rules = (await fs.readFile(location, 'utf8')).split(/\r?\n/)
      .map(line => line.split('#', 1)[0].trim().replace(/\s+/g, ' ')).filter(Boolean);
    if (location === path.join(ROOT, 'public', '_redirects')) {
      assert.deepEqual(rules, REDIRECTS, `Unexpected source redirect rules: ${location}`);
    } else {
      for (const rule of REDIRECTS) assert(rules.includes(rule), `Missing base rule: ${rule}`);
      const fallbackIndex = rules.indexOf(`${BASE}/* /:splat 200`);
      for (const { url } of documents) {
        const rule = `${url.slice(0, -1)} ${url} 308`;
        assert(rules.includes(rule) && rules.indexOf(rule) < fallbackIndex, `Missing prioritized canonical redirect: ${rule}`);
      }
    }
  }
  const assets = files.filter(file => !/\.html?$/i.test(file) && !CONTROL_FILES.has(file) && !file.startsWith('_worker.js/'));
  for (const [name, predicate] of [
    ['CSS', file => file.endsWith('.css')], ['JS', file => /\.m?js$/.test(file)],
    ['image', file => /\.(svg|png|jpe?g|webp|avif|gif|ico)$/.test(file)],
    ['Pagefind', file => file.startsWith('pagefind/')], ['sitemap', file => /^sitemap.*\.xml$/.test(file)],
  ]) assert(assets.some(predicate), `Missing ${name} artifacts; refusing vacuous resource coverage`);
  for (const file of [...htmlFiles, ...assets]) {
    if (!/\.html?$/i.test(file)) assert(MIME[path.posix.extname(file).toLowerCase()], `Add an explicit MIME expectation for ${file}`);
    const bytes = await fs.readFile(path.join(DIST, file));
    assert(bytes.length, `Empty build artifact: ${file}`);
    expected.set(file, { hash: sha256(bytes) });
  }

  // Serve unmodified snapshots, keeping Wrangler's generated files, state and logs
  // out of the repository and away from other Pages sessions. Never patch inputs.
  temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'sonic-pages-runtime-'));
  await Promise.all([
    fs.cp(DIST, path.join(temporary, 'dist'), { recursive: true }),
    fs.cp(path.join(ROOT, 'functions'), path.join(temporary, 'functions'), { recursive: true }),
  ]);
  await startRuntime(binary);

  await each(LANGUAGES, language => check('languages', `/ [${language.accept}]`, async () => {
    const response = await get('/', { 'Accept-Language': language.accept });
    assert.equal(response.status, 302, `Expected language negotiation 302, got ${response.status}`);
    verifyLocation(response, '/', docPath(language, 'overview'));
    const tokens = header => (response.headers.get(header) || '').toLowerCase().split(',').map(value => value.trim());
    assert(tokens('cache-control').includes('no-store'), 'Language redirect must include Cache-Control: no-store');
    assert(tokens('vary').includes('accept-language'), 'Language redirect must include Vary: Accept-Language');
    assert(!response.headers.has('set-cookie'), 'Language negotiation must not set a cookie');
  }));
  await check('baseRedirect', BASE, async () => {
    const response = await get(BASE);
    assert.equal(response.status, 308, `Expected /sonic 308, got ${response.status}`);
    verifyLocation(response, BASE, `${BASE}/`);
  });
  await check('entry', `${BASE}/`, async () => {
    verifyHtml(await get(`${BASE}/`, { 'Accept-Language': 'en-US' }), 'index.html', 'zh-CN');
  });
  await each(documents, document => check('html', document.url, async () => {
    verifyHtml(await get(document.url), document.file, document.lang);
  }));
  await each(assets, file => check('assets', assetPath(file), async () => {
    const response = await get(assetPath(file));
    assert.equal(response.status, 200, `Expected asset 200, got ${response.status}`);
    const actual = (response.headers.get('content-type') || '').split(';', 1)[0].trim().toLowerCase();
    const allowed = MIME[path.posix.extname(file).toLowerCase()];
    assert(allowed.includes(actual), `Wrong MIME ${JSON.stringify(actual)}; expected ${allowed.join(' or ')}`);
    assert(!/^\s*(?:<!doctype\s+html\b|<html\b)/i.test(response.body.subarray(0, 512).toString('utf8')), 'Asset is an HTML error/fallback page');
    verifyBytes(response, file);
  }));
  await each(documents, document => {
    const withoutSlash = document.url.slice(0, -1);
    return check('noTrailingSlash', withoutSlash, async () => {
      const response = await get(withoutSlash);
      assert([301, 302, 303, 307, 308].includes(response.status), `Expected canonical document redirect, got ${response.status}`);
      // A redirect to /en/overview/ may eventually return 200, but is a real base
      // path defect. Do not follow it, strip the prefix, or weaken this assertion.
      verifyLocation(response, withoutSlash, document.url);
    });
  });
  await check('notFound', `${BASE}/missing-release-check/`, async () => {
    verifyHtml(await get(`${BASE}/missing-release-check/`), '404.html', 'zh-CN', 404);
  });
  abort.signal.throwIfAborted();
} catch (error) {
  fail('runtime', 'acceptance', error);
  if (output) console.error(output.trim().split(/\r?\n/).slice(-12).join('\n'));
} finally {
  try {
    await stopRuntime();
    if (temporary) await fs.rm(temporary, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    cleanedUp = true;
  } catch (error) {
    fail('cleanup', temporary || 'owned child', error);
  }
  clearTimeout(watchdog);
  process.off('SIGINT', onSigint);
  process.off('SIGTERM', onSigterm);
  // Include late warnings emitted during shutdown, not just startup output.
  if (invalidRedirectRules) fail('redirectRules', 'Wrangler output', invalidRedirectDetail);
  if (failures > 8) console.error(`${failures - 8} additional failures suppressed; see failureKinds in stdout JSON.`);
  process.exitCode = failures ? 1 : 0;
  console.log(JSON.stringify({
    ok: failures === 0, wrangler: VERSION, compatibilityDate: COMPATIBILITY_DATE,
    port: port ?? null, counts, requests, failures, failureKinds,
    cleanup: cleanedUp, durationMs: Date.now() - started,
  }));
}
