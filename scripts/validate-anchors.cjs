// File-only checks for Astro's flat dist/ output. No HTTP or MIME assertions.
// Usage: node scripts/validate-anchors.cjs [dist-directory]
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const SITE_ORIGIN = 'https://docs.epocanvas.com';
const SITE_BASE = '/sonic';
const SITE_HOST = new URL(SITE_ORIGIN).hostname;
const LANGUAGES = [
  { directory: '', lang: 'zh-CN' },
  { directory: 'zh-tw', lang: 'zh-TW' },
  ...['en', 'fr', 'es', 'de', 'ja', 'ko', 'pt', 'ru'].map(lang => ({ directory: lang, lang })),
];
const DOCUMENTS = [
  'project', 'interface', 'overview', 'quickstart', 'features', 'api',
  'privacy-policy', 'terms-of-service', 'acceptable-use', 'data-security',
  'sub-processors', 'open-source', 'deployment', 'development', 'search-syntax',
  'library', 'mobile', 'recommendation', 'account-security', 'data-management',
  'troubleshooting', 'key-terms',
];
const documentFile = (language, slug) => [language.directory, slug, 'index.html'].filter(Boolean).join('/');
const documentUrl = (language, slug) => new URL(`${SITE_BASE}/${[language.directory, slug].filter(Boolean).join('/')}/`, SITE_ORIGIN);
const EXPECTED_DOCUMENTS = new Map(LANGUAGES.flatMap(language =>
  DOCUMENTS.map(slug => [documentFile(language, slug), { language, slug }])
));
const hasRel = (element, rel) => (element.properties.rel || []).some(value => value.toLowerCase() === rel);

function checkConfiguration() {
  const config = fs.readFileSync(path.join(ROOT, 'astro.config.mjs'), 'utf8');
  for (const [name, expected] of [['SITE_ORIGIN', SITE_ORIGIN], ['SITE_BASE', SITE_BASE]]) {
    const actual = config.match(new RegExp(`\\bconst\\s+${name}\\s*=\\s*(['"])(.*?)\\1`))?.[2];
    if (actual !== expected) throw new Error(`astro.config.mjs ${name} must be ${expected}; got ${JSON.stringify(actual)}`);
  }
}

async function loadSite(directory = path.join(ROOT, 'dist')) {
  checkConfiguration();
  const dist = path.resolve(directory);
  if (!fs.existsSync(dist) || !fs.statSync(dist).isDirectory()) {
    throw new Error(`Build directory not found: ${dist}. Run pnpm run build first.`);
  }
  const files = new Set();
  function walk(relative = '') {
    for (const entry of fs.readdirSync(path.join(dist, relative), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile()) files.add(file);
    }
  }
  walk();
  const htmlFiles = [...files].filter(file => file.endsWith('.html'));
  if (!htmlFiles.length) throw new Error(`No HTML pages found in ${dist}; refusing an empty build.`);

  // Reuse Astro's declared HTML parser dependency without adding a package or
  // depending on pnpm's store layout. It handles entities, all attribute quote
  // styles, comments and script text, unlike regular expressions over HTML.
  const fromAstro = createRequire(require.resolve('astro/package.json'));
  const { rehype } = await import(pathToFileURL(fromAstro.resolve('rehype')).href);
  const parser = rehype();
  const site = {
    dist, files, pages: new Map(), errors: 0,
    counts: { documents: 0, ids: 0, duplicateIds: 0, hrefs: 0, anchors: 0, images: 0, srcsets: 0, scripts: 0, linkResources: 0, external: 0 },
    fail(kind, file, detail) {
      this.errors++;
      console.error(`${kind} ${file}: ${detail}`);
    },
  };
  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(dist, file), 'utf8');
    const page = {
      file,
      url: new URL(`${SITE_BASE}/${file.replace(/(^|\/)index\.html$/, '$1')}`, SITE_ORIGIN),
      elements: [], ids: new Set(), namedAnchors: new Set(),
    };
    function visit(node, inHead = false) {
      if (node.type === 'element') {
        inHead = inHead || node.tagName === 'head';
        page.elements.push({ tagName: node.tagName, properties: node.properties, inHead });
        const { id, name } = node.properties;
        if (typeof id === 'string') {
          site.counts.ids++;
          if (page.ids.has(id)) {
            site.counts.duplicateIds++;
            site.fail('DUPLICATE ID', file, JSON.stringify(id));
          }
          page.ids.add(id);
        }
        if (node.tagName === 'a' && typeof name === 'string') page.namedAnchors.add(name);
      }
      // Template contents are a separate, inert document fragment, not IDs in
      // this document. Script/style text and comments have no element children.
      for (const child of node.children || []) visit(child, inHead);
    }
    visit(parser.parse(html));
    site.pages.set(file, page);
  }
  return site;
}

function checkExpectedPages(site) {
  site.counts.documents = 0;
  for (const file of EXPECTED_DOCUMENTS.keys()) {
    if (site.pages.has(file)) site.counts.documents++;
    else site.fail('MISSING PAGE', file, 'required by the 10-language × 22-document matrix');
  }
  if (!site.pages.has('404.html')) site.fail('MISSING PAGE', '404.html', 'required error page');
}

function resolveReference(site, value, pageUrl) {
  let url;
  try {
    url = new URL(value, pageUrl);
  } catch {
    return { error: 'INVALID URL' };
  }
  // A different scheme or port on the real hostname is not an external link
  // that can silently bypass this site's origin/base checks.
  if (url.hostname !== SITE_HOST) return { url, external: true };
  if (url.origin !== SITE_ORIGIN || url.username || url.password) return { url, error: 'WRONG SITE ORIGIN' };
  if (url.pathname !== SITE_BASE && !url.pathname.startsWith(`${SITE_BASE}/`)) return { url, error: 'MISSING BASE PREFIX' };
  let relative;
  try {
    relative = decodeURIComponent(url.pathname.slice(SITE_BASE.length)).replace(/^\//, '');
  } catch {
    return { url, error: 'INVALID PATH ENCODING' };
  }
  if (/[\\\x00-\x1f\x7f]/.test(relative) || relative.split('/').some(part => part === '..' || part === '.' || part.includes(':'))) {
    return { url, error: 'UNSAFE PATH' };
  }
  // Use the exact, case-sensitive inventory even on Windows. Strip only the
  // deployment base: /sonic/_astro/x.js => dist/_astro/x.js, never dist/sonic/.
  // Queries and fragments do not form part of a file name. Assets are checked
  // as files before trying directory indexes or clean .html page aliases.
  const candidates = [relative];
  if (!relative || relative.endsWith('/')) candidates.push(`${relative}index.html`);
  else if (!path.posix.extname(relative)) candidates.push(`${relative}/index.html`);
  const clean = relative.replace(/\/$/, '');
  if (clean && !path.posix.extname(clean)) candidates.push(`${clean}.html`);
  const target = candidates.find(file => site.files.has(file));
  return target ? { url, target } : { url, error: 'MISSING TARGET' };
}

// Tokenize srcset URLs without splitting commas inside data URLs (or URL
// paths). Descriptors end at the next comma outside parentheses, as in HTML.
function srcsetUrls(value) {
  const urls = [];
  let i = 0;
  const space = character => /[\t\n\f\r ]/.test(character);
  while (i < value.length) {
    while (i < value.length && (space(value[i]) || value[i] === ',')) i++;
    const start = i;
    while (i < value.length && !space(value[i])) i++;
    let url = value.slice(start, i);
    if (!url) break;
    if (url.endsWith(',')) {
      urls.push(url.replace(/,+$/, ''));
      continue;
    }
    urls.push(url);
    let parentheses = 0;
    while (i < value.length) {
      const character = value[i++];
      if (character === '(') parentheses++;
      else if (character === ')') parentheses = Math.max(0, parentheses - 1);
      else if (character === ',' && parentheses === 0) break;
    }
  }
  return urls;
}

function checkLinks(site) {
  function check(page, value, kind, counter, baseUrl = page.url) {
    const result = resolveReference(site, value, baseUrl);
    if (result.external) {
      site.counts.external++;
      return;
    }
    site.counts[counter]++;
    if (result.error) {
      site.fail(result.error, page.file, `${kind}=${JSON.stringify(value)}`);
      return;
    }
    const { url, target } = result;
    const targetPage = site.pages.get(target);
    if (!url.hash || !targetPage) return; // SVG/other asset fragments are not HTML IDs.
    // Text-fragment directives and the conventional #top need no element ID.
    const encoded = url.hash.slice(1).split(':~:')[0];
    if (!encoded) return;
    site.counts.anchors++;
    let id;
    try {
      id = decodeURIComponent(encoded);
    } catch {
      site.fail('INVALID FRAGMENT ENCODING', page.file, `${kind}=${JSON.stringify(value)}`);
      return;
    }
    if (!targetPage.ids.has(id) && !targetPage.namedAnchors.has(id) && id.toLowerCase() !== 'top') {
      site.fail('BROKEN ANCHOR', page.file, `${kind}=${JSON.stringify(value)} -> ${target}#${id}`);
    }
  }
  for (const page of site.pages.values()) {
    let baseUrl = page.url;
    const baseElement = page.elements.find(element => element.tagName === 'base' && typeof element.properties.href === 'string');
    if (baseElement) {
      const result = resolveReference(site, baseElement.properties.href, page.url);
      if (result.error || result.external) site.fail('INVALID DOCUMENT BASE', page.file, baseElement.properties.href);
      else baseUrl = result.url;
    }
    for (const element of page.elements) {
      const { tagName, properties } = element;
      if (typeof properties.href === 'string') {
        check(page, properties.href, `${tagName}.href`, 'hrefs', tagName === 'base' ? page.url : baseUrl);
        if (tagName === 'link' && !hasRel(element, 'canonical') && !(hasRel(element, 'alternate') && properties.hrefLang)) {
          const result = resolveReference(site, properties.href, baseUrl);
          if (!result.external) site.counts.linkResources++;
        }
      }
      if ((tagName === 'img' || tagName === 'source') && typeof properties.src === 'string') {
        check(page, properties.src, `${tagName}.src`, 'images', baseUrl);
      }
      if ((tagName === 'img' || tagName === 'source') && typeof properties.srcSet === 'string') {
        for (const value of srcsetUrls(properties.srcSet)) check(page, value, `${tagName}.srcset`, 'srcsets', baseUrl);
      }
      if (tagName === 'script' && typeof properties.src === 'string') check(page, properties.src, 'script.src', 'scripts', baseUrl);
    }
  }
}

async function main() {
  if (process.argv.length > 3) throw new Error('Usage: node scripts/validate-anchors.cjs [dist-directory]');
  const site = await loadSite(process.argv[2]);
  checkExpectedPages(site);
  checkLinks(site);
  const c = site.counts;
  console.log(`pages=${site.pages.size}, documents=${c.documents}/${EXPECTED_DOCUMENTS.size}, ids=${c.ids}, duplicate-ids=${c.duplicateIds}, hrefs-checked=${c.hrefs}, anchors-checked=${c.anchors}, images-checked=${c.images}, srcset-checked=${c.srcsets}, scripts-checked=${c.scripts}, link-resources-checked=${c.linkResources}, external-skipped=${c.external}, broken=${site.errors}`);
  process.exitCode = site.errors ? 1 : 0;
}

module.exports = {
  SITE_ORIGIN, SITE_BASE, LANGUAGES, DOCUMENTS, EXPECTED_DOCUMENTS,
  documentFile, documentUrl, hasRel, loadSite, checkExpectedPages, resolveReference, srcsetUrls, checkLinks,
};
if (require.main === module) {
  main().catch(error => {
    console.error(`validate-anchors: ${error.message}`);
    process.exitCode = 1;
  });
}
