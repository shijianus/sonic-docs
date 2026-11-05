// File-only rendered-content/metadata/search checks, complementary to validate-anchors.cjs.
// Usage: node scripts/check-rendered-site.mjs [dist-directory]
// This does not verify deployment responses, MIME types or search execution.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import checks from './validate-anchors.cjs';
import { languageNotices } from '../src/lib/language-notice.mjs';

const {
  SITE_ORIGIN, SITE_BASE, LANGUAGES, DOCUMENTS, EXPECTED_DOCUMENTS,
  documentFile, documentUrl, hasRel, loadSite, checkExpectedPages, resolveReference,
} = checks;
const require = createRequire(import.meta.url);

function checkInventory(site) {
  const expected = new Set([...EXPECTED_DOCUMENTS.keys(), 'index.html', '404.html']);
  // Also reject differently cased extensions and .htm pages the shared loader skips.
  const htmlFiles = [...site.files].filter(file => /\.html?$/i.test(file));
  if (htmlFiles.length !== 222 || site.pages.size !== 222) {
    site.fail('HTML PAGE COUNT', site.dist, `expected exactly 222 (220 documents, index.html, 404.html), got ${htmlFiles.length}`);
  }
  for (const file of htmlFiles) {
    if (!expected.has(file)) site.fail('UNEXPECTED HTML PAGE', file, 'not in the required page matrix');
  }
  if (!site.pages.has('index.html')) site.fail('MISSING PAGE', 'index.html', 'required landing page');
  else {
    const landing = fs.readFileSync(path.join(site.dist, 'index.html'), 'utf8');
    if (!landing.includes('class="language-policy"') || !landing.includes('简体中文为维护基准')) {
      site.fail('LANDING LANGUAGE NOTICE', 'index.html', 'expected the bilingual language baseline notice');
    }
  }
}

function sidebarExpectations() {
  const config = fs.readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  // Extract only the controlled string maps and g()/t() calls, never execute config.
  // Unsupported syntax fails closed rather than silently falling back to Chinese.
  const string = String.raw`(?:'(?:\\['"\\]|[^'\\\r\n])*'|"(?:\\['"\\]|[^"\\\r\n])*")`;
  const unquote = value => value.slice(1, -1).replace(/\\(['"\\])/g, '$1');
  function stringMap(name, size) {
    const body = config.match(new RegExp(`\\bconst\\s+${name}\\s*=\\s*\\{([\\s\\S]*?)\\n\\s*\\};`))?.[1];
    if (body === undefined) throw new Error(`Missing static ${name} in astro.config.mjs`);
    const entries = new Map();
    const entryPattern = new RegExp(`(${string})\\s*:\\s*\\{([^{}]*)\\}\\s*,?`, 'g');
    for (const [, label, values] of body.matchAll(entryPattern)) {
      const pairs = new Map();
      const pairPattern = new RegExp(`(${string}|[A-Za-z_$][\\w$]*)\\s*:\\s*(${string})\\s*,?`, 'g');
      for (const [, key, value] of values.matchAll(pairPattern)) {
        const tag = /^["']/.test(key) ? unquote(key) : key;
        if (pairs.has(tag)) throw new Error(`Duplicate ${name} ${label}: ${tag}`);
        pairs.set(tag, unquote(value));
      }
      if (values.replace(pairPattern, '').trim() || entries.has(unquote(label))) throw new Error(`Invalid static ${name} entry: ${label}`);
      entries.set(unquote(label), pairs);
    }
    if (body.replace(entryPattern, '').trim() || entries.size !== size) throw new Error(`${name} must contain ${size} static string maps`);
    return entries;
  }
  const itemMap = stringMap('SIDEBAR_I18N', 22);
  const groupMap = stringMap('SIDEBAR_GROUPS_I18N', 6);
  const groups = [...config.matchAll(new RegExp(`\\bg\\(\\s*(${string})\\s*,\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, 'g'))].map(([, label, body]) => ({
    label: unquote(label),
    items: [...body.matchAll(new RegExp(`\\bt\\(\\s*(${string})\\s*,\\s*(${string})\\s*\\)`, 'g'))].map(([, label, slug]) => ({ label: unquote(label), slug: unquote(slug) })),
  }));
  const slugs = groups.flatMap(group => group.items.map(item => item.slug));
  if (groups.length !== 6 || slugs.length !== 22 || new Set(slugs).size !== 22 || DOCUMENTS.some(slug => !slugs.includes(slug))) {
    throw new Error('Expected six sidebar groups covering exactly the 22 document slugs in astro.config.mjs');
  }
  function translate(map, label, langTag) {
    const entry = map.get(label);
    const value = entry && (langTag === LANGUAGES[0].lang ? label : entry.get(langTag));
    if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing sidebar translation ${JSON.stringify(label)} for lang tag ${langTag} (not its URL directory)`);
    return value;
  }
  return new Map(LANGUAGES.map(({ lang }) => [lang, groups.map(group => ({
    label: translate(groupMap, group.label, lang),
    items: group.items.map(item => ({ slug: item.slug, label: translate(itemMap, item.label, lang) })),
  }))]));
}

function elements(node, predicate, found = []) {
  if (!node) return found;
  if (node.type === 'element' && predicate(node)) found.push(node);
  for (const child of node.children || []) elements(child, predicate, found);
  return found;
}
const hasClass = (node, name) => node.properties?.className?.includes(name);
function textContent(node, ignoredClass) {
  if (!node || (ignoredClass && hasClass(node, ignoredClass))) return '';
  return node.type === 'text' ? node.value : (node.children || []).map(child => textContent(child, ignoredClass)).join('');
}
const text = (node, ignoredClass) => textContent(node, ignoredClass).replace(/\s+/gu, ' ').trim();

function checkDocumentLink(site, page, link, language, slug, kind) {
  const href = link.properties.href;
  const result = typeof href === 'string' && href.trim() ? resolveReference(site, href, page.url) : { error: 'missing href' };
  const expected = documentFile(language, slug);
  if (result.error || result.external || result.target !== expected || result.url?.search || result.url?.hash) {
    site.fail(kind, page.file, `expected ${expected}, got ${JSON.stringify(href)}${result.error ? ` (${result.error})` : ''}`);
  }
}

function checkSidebar(site, page, tree, language, groups, counts) {
  const roots = elements(tree, node => node.properties.id === 'starlight__sidebar');
  if (roots.length !== 1) site.fail('SIDEBAR COUNT', page.file, `expected one sidebar, got ${roots.length}`);
  const actual = elements(roots[0], node => node.tagName === 'details');
  if (actual.length !== 6) site.fail('SIDEBAR GROUP COUNT', page.file, `expected six, got ${actual.length}`);
  counts.sidebarLanguages++;
  groups.forEach((group, index) => {
    if (!actual[index]) return;
    counts.sidebarGroups++;
    const summaries = (actual[index].children || []).filter(node => node.tagName === 'summary');
    if (summaries.length !== 1 || text(summaries[0]) !== group.label) {
      site.fail('SIDEBAR GROUP TEXT', page.file, `${language.lang}: expected ${JSON.stringify(group.label)}, got ${JSON.stringify(text(summaries[0]))}`);
    }
    const links = elements(actual[index], node => node.tagName === 'a');
    if (links.length !== group.items.length) site.fail('SIDEBAR ITEM COUNT', page.file, `${group.label}: expected ${group.items.length}, got ${links.length}`);
    group.items.forEach((item, itemIndex) => {
      const link = links[itemIndex];
      if (!link) return;
      counts.sidebarItems++;
      checkDocumentLink(site, page, link, language, item.slug, 'SIDEBAR LINK');
      if (text(link) !== item.label) site.fail('SIDEBAR ITEM TEXT', page.file, `${language.lang}/${item.slug}: expected ${JSON.stringify(item.label)}, got ${JSON.stringify(text(link))}`);
    });
  });
}

function checkPagination(site, page, tree, document, groups, labels, counts) {
  const blocks = elements(tree, node => hasClass(node, 'pagination-links'));
  if (blocks.length !== 1) site.fail('PAGINATION COUNT', page.file, `expected one pagination block, got ${blocks.length}`);
  const items = groups.flatMap(group => group.items);
  const index = items.findIndex(item => item.slug === document.slug);
  for (const [rel, offset, labelKey] of [['prev', -1, 'page.previousLink'], ['next', 1, 'page.nextLink']]) {
    const expected = items[index + offset];
    const links = elements(blocks[0], node => node.tagName === 'a' && hasRel(node, rel));
    // The first/last sidebar document legitimately has only one direction.
    if (links.length !== (expected ? 1 : 0)) site.fail('PAGINATION LINK COUNT', page.file, `${rel}: expected ${expected ? 1 : 0}, got ${links.length}`);
    if (!expected) continue;
    for (const link of links) {
      counts.paginationLinks++;
      checkDocumentLink(site, page, link, document.language, expected.slug, 'PAGINATION TARGET');
      const titles = elements(link, node => hasClass(node, 'link-title'));
      if (titles.length !== 1 || text(titles[0]) !== expected.label || text(link, 'link-title') !== labels[labelKey]) {
        site.fail('PAGINATION TEXT', page.file, `${document.language.lang}/${rel}: expected ${JSON.stringify(`${labels[labelKey]} / ${expected.label}`)}, got ${JSON.stringify(text(link))}`);
      }
    }
  }

  // 阅读路径必须为每篇文档提供一个带篇名的节点，悬停 title 不能为空。
  const points = elements(tree, node => hasClass(node, 'route-point'));
  counts.routePoints += points.length;
  if (points.length !== items.length) site.fail('ROUTE POINT COUNT', page.file, `expected ${items.length}, got ${points.length}`);
  for (const [position, point] of points.entries()) {
    const titles = elements(point, node => node.tagName === 'title');
    if (titles.length !== 1 || !text(titles[0]).trim()) site.fail('ROUTE POINT TITLE', page.file, `point ${position + 1}: expected one non-empty title`);
  }

  // 全站语言声明：每一页（含 404）都使用当前语言的固定文案。
  const notices = elements(tree, node => hasClass(node, 'language-notice'));
  counts.notices++;
  const expectedNotice = languageNotices[document.language.lang];
  if (notices.length !== 1 || !expectedNotice || text(notices[0]) !== expectedNotice) {
    site.fail('LANGUAGE NOTICE', page.file, `${document.language.lang}: expected one localized language notice`);
  }
}

async function checkRenderedContent(site) {
  const counts = { utf8: 0, charsets: 0, images: 0, options: 0, paginationLinks: 0, routePoints: 0, notices: 0, sidebarLanguages: 0, sidebarGroups: 0, sidebarItems: 0 };
  const fromAstro = createRequire(require.resolve('astro/package.json'));
  const { rehype } = await import(pathToFileURL(fromAstro.resolve('rehype')).href);
  const parser = rehype();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const sidebars = sidebarExpectations();
  const starlight = path.dirname(require.resolve('@astrojs/starlight'));
  const paginationLabels = new Map(LANGUAGES.map(({ lang }) => [lang, JSON.parse(fs.readFileSync(path.join(starlight, 'translations', `${lang}.json`), 'utf8'))]));
  for (const page of site.pages.values()) {
    let html;
    try {
      html = decoder.decode(fs.readFileSync(path.join(site.dist, page.file)));
      counts.utf8++;
    } catch (error) {
      site.fail('INVALID UTF-8', page.file, error.message);
      continue;
    }
    const tree = parser.parse(html);
    if (html.includes('\uFFFD') || textContent(tree).includes('\uFFFD') || page.elements.some(element => Object.values(element.properties).some(value => String(value).includes('\uFFFD')))) {
      site.fail('REPLACEMENT CHARACTER', page.file, 'U+FFFD is forbidden in HTML text or attributes');
    }
    const charsets = page.elements.filter(element => element.tagName === 'meta' && Object.hasOwn(element.properties, 'charSet'));
    counts.charsets++;
    if (charsets.length !== 1 || !charsets[0].inHead || String(charsets[0].properties.charSet).trim().toLowerCase() !== 'utf-8') {
      site.fail('HTML CHARSET', page.file, `expected one UTF-8 charset in head, got ${JSON.stringify(charsets.map(element => element.properties.charSet))}`);
    }
    for (const { tagName, properties } of page.elements) {
      // Decorative logos may have empty alt; dynamic dialog images have no src.
      if (tagName === 'img' && typeof properties.src === 'string' && properties.src.startsWith(`${SITE_BASE}/images/sonic/`)) {
        counts.images++;
        for (const dimension of ['width', 'height']) {
          if (!Number.isFinite(Number(properties[dimension])) || Number(properties[dimension]) <= 0) site.fail(`IMAGE ${dimension.toUpperCase()}`, page.file, `${properties.src}: expected a positive ${dimension}, got ${JSON.stringify(properties[dimension])}`);
        }
        if (typeof properties.alt !== 'string' || !properties.alt.trim()) site.fail('IMAGE ALT', page.file, `${properties.src}: expected non-empty alt`);
        if (properties.decoding !== 'async') site.fail('IMAGE DECODING', page.file, `${properties.src}: expected async`);
        if (!['eager', 'lazy'].includes(properties.loading)) site.fail('IMAGE LOADING', page.file, `${properties.src}: expected eager or lazy`);
      }
      if (tagName === 'option' && typeof properties.value === 'string' && properties.value.startsWith(SITE_BASE)) {
        counts.options++;
        const result = resolveReference(site, properties.value, page.url);
        // 404 options intentionally resolve to each language's overview, not 404.
        if (result.error || result.external || !site.pages.has(result.target)) site.fail('LANGUAGE OPTION', page.file, `${JSON.stringify(properties.value)} (${result.error || 'expected a local HTML page'})`);
      }
    }
    const document = EXPECTED_DOCUMENTS.get(page.file);
    if (!document) continue;
    for (const tagName of ['h1', 'main']) {
      const total = page.elements.filter(element => element.tagName === tagName).length;
      if (total !== 1) site.fail('DOCUMENT STRUCTURE', page.file, `expected one ${tagName}, got ${total}`);
    }
    const groups = sidebars.get(document.language.lang);
    checkPagination(site, page, tree, document, groups, paginationLabels.get(document.language.lang), counts);
    if (document.slug === 'overview') checkSidebar(site, page, tree, document.language, groups, counts);
  }
  return counts;
}

function checkRedirects(site) {
  const file = '_redirects';
  const required = [
    '/sonic /sonic/ 308', '/sonic/ / 200', '/sonic/* /:splat 200',
    ...LANGUAGES.flatMap(language => DOCUMENTS.map(slug => {
      const target = documentUrl(language, slug).pathname;
      return `${target.slice(0, -1)} ${target} 308`;
    })),
  ];
  if (!site.files.has(file)) {
    site.fail('MISSING REDIRECTS', file, 'expected the built public/_redirects artifact');
    return 0;
  }
  const rules = new Set(fs.readFileSync(path.join(site.dist, file), 'utf8').split(/\r?\n/).map(line => line.split('#', 1)[0].trim().replace(/\s+/g, ' ')));
  for (const rule of required) if (!rules.has(rule)) site.fail('MISSING REDIRECT RULE', file, rule);
  return required.filter(rule => rules.has(rule)).length;
}

function checkMetadata(site) {
  const counts = { languages: 0, canonicals: 0, alternates: 0 };
  for (const page of site.pages.values()) {
    const document = EXPECTED_DOCUMENTS.get(page.file);
    const language = document?.language || LANGUAGES.find(({ directory }) => directory && page.file.startsWith(`${directory}/`)) || LANGUAGES[0];
    const html = page.elements.filter(element => element.tagName === 'html');
    counts.languages++;
    if (html.length !== 1 || html[0].properties.lang?.toLowerCase() !== language.lang.toLowerCase()) {
      site.fail('HTML LANG', page.file, `expected ${language.lang}, got ${JSON.stringify(html[0]?.properties.lang)}`);
    }
    const headLinks = page.elements.filter(element => element.inHead && element.tagName === 'link');
    const canonicals = headLinks.filter(element => hasRel(element, 'canonical'));
    const alternates = headLinks.filter(element => hasRel(element, 'alternate') && Object.hasOwn(element.properties, 'hrefLang'));
    const isError = page.file === '404.html';
    const isLanding = page.file === 'index.html';
    // A 404 need not be indexed and has no translated document counterparts.
    // The static landing page deliberately canonicalizes to the root overview.
    // Present metadata is always checked; these exceptions never hide dead URLs.
    if ((!isError && canonicals.length !== 1) || (isError && canonicals.length > 1)) {
      site.fail('CANONICAL COUNT', page.file, `expected ${isError ? 'at most one' : 'one'}, got ${canonicals.length}`);
    }
    const expectedCanonical = document ? documentUrl(document.language, document.slug)
      : isLanding ? documentUrl(LANGUAGES[0], 'overview') : page.url;
    for (const element of canonicals) {
      counts.canonicals++;
      const href = element.properties.href;
      const result = metadataTarget(site, page, href, 'CANONICAL', !isLanding);
      if (!result) continue;
      if (isError) {
        if (result.target !== page.file) site.fail('WRONG CANONICAL', page.file, `${href} does not identify 404.html`);
      } else if (result.url.href !== expectedCanonical.href) {
        site.fail('WRONG CANONICAL', page.file, `expected ${expectedCanonical.href}, got ${href}`);
      }
    }
    const seen = new Set();
    for (const element of alternates) {
      counts.alternates++;
      const tag = String(element.properties.hrefLang).toLowerCase();
      if (seen.has(tag)) site.fail('DUPLICATE HREFLANG', page.file, tag);
      seen.add(tag);
      const alternateLanguage = LANGUAGES.find(language => language.lang.toLowerCase() === tag);
      if (!alternateLanguage && tag !== 'x-default') site.fail('UNKNOWN HREFLANG', page.file, tag);
      const href = element.properties.href;
      const result = metadataTarget(site, page, href, `HREFLANG ${tag}`, true);
      if (!result) continue;
      if (document || isLanding) {
        const expected = documentUrl(alternateLanguage || LANGUAGES[0], document?.slug || 'overview');
        if (result.url.href !== expected.href) site.fail('WRONG HREFLANG', page.file, `${tag}: expected ${expected.href}, got ${href}`);
      } else {
        const targetPage = site.pages.get(result.target);
        const targetLang = targetPage?.elements.find(element => element.tagName === 'html')?.properties.lang;
        if (!targetPage || (tag !== 'x-default' && targetLang?.toLowerCase() !== tag)) {
          site.fail('WRONG HREFLANG', page.file, `${tag}: ${href} must identify an HTML page of that language`);
        }
      }
    }
    if (document) {
      for (const language of LANGUAGES) {
        if (!seen.has(language.lang.toLowerCase())) site.fail('MISSING HREFLANG', page.file, language.lang);
      }
    }
  }
  return counts;
}

function metadataTarget(site, page, href, label, absolute) {
  if (typeof href !== 'string' || !href.trim()) {
    site.fail(`INVALID ${label}`, page.file, 'missing href');
    return null;
  }
  const result = resolveReference(site, href, page.url);
  if (result.error || result.external || (absolute && !href.startsWith(`${SITE_ORIGIN}${SITE_BASE}/`)) || result.url?.search || result.url?.hash) {
    site.fail(`INVALID ${label}`, page.file, `${JSON.stringify(href)} (${result.error || 'expected a clean, same-site canonical URL'})`);
    return null;
  }
  return result;
}

function checkPagefind(site) {
  const manifestFile = 'pagefind/pagefind-entry.json';
  const counts = { languages: 0, pages: 0, files: 0 };
  function requireFile(file) {
    counts.files++;
    if (!site.files.has(file) || fs.statSync(path.join(site.dist, file)).size === 0) {
      site.fail('MISSING PAGEFIND FILE', file, 'expected a non-empty build artifact');
      return false;
    }
    return true;
  }
  if (!requireFile(manifestFile)) return counts;
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(site.dist, manifestFile), 'utf8'));
  } catch (error) {
    site.fail('INVALID PAGEFIND MANIFEST', manifestFile, error.message);
    return counts;
  }
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  if (!isObject(manifest) || !isObject(manifest.languages)) {
    site.fail('INVALID PAGEFIND MANIFEST', manifestFile, 'expected a languages object');
    return counts;
  }
  requireFile('pagefind/pagefind.js');
  const expectedTags = new Set(LANGUAGES.map(language => language.lang.toLowerCase()));
  for (const tag of Object.keys(manifest.languages)) {
    if (!expectedTags.has(tag)) site.fail('UNEXPECTED PAGEFIND LANGUAGE', manifestFile, tag);
  }
  const wasmFiles = new Set();
  for (const language of LANGUAGES) {
    const tag = language.lang.toLowerCase();
    const entry = manifest.languages[tag];
    const actualPages = [...EXPECTED_DOCUMENTS].filter(([file, document]) => document.language === language && site.pages.has(file)).length;
    console.log(`language=${tag}, directory=${language.directory || '(root)'}, documents=${actualPages}/${DOCUMENTS.length}, pagefind-pages=${entry?.page_count ?? 'missing'}`);
    if (!isObject(entry)) {
      site.fail('MISSING PAGEFIND LANGUAGE', manifestFile, `${tag} (${language.directory || 'root'} directory)`);
      continue;
    }
    counts.languages++;
    if (!Number.isInteger(entry.page_count) || entry.page_count !== DOCUMENTS.length || entry.page_count !== actualPages) {
      site.fail('PAGEFIND PAGE COUNT', manifestFile, `${tag}: expected ${DOCUMENTS.length} rendered documents, got ${JSON.stringify(entry.page_count)}`);
    }
    if (Number.isInteger(entry.page_count) && entry.page_count > 0) counts.pages += entry.page_count;
    if (typeof entry.hash !== 'string' || !new RegExp(`^${tag}_[a-zA-Z0-9_-]+$`).test(entry.hash)) {
      site.fail('INVALID PAGEFIND HASH', manifestFile, `${tag}: ${JSON.stringify(entry.hash)}`);
    } else {
      requireFile(`pagefind/pagefind.${entry.hash}.pf_meta`);
    }
    if (entry.wasm !== null && (typeof entry.wasm !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(entry.wasm))) {
      site.fail('INVALID PAGEFIND WASM', manifestFile, `${tag}: ${JSON.stringify(entry.wasm)}`);
    } else {
      wasmFiles.add(`pagefind/wasm.${entry.wasm || 'unknown'}.pagefind`);
    }
  }
  for (const file of wasmFiles) requireFile(file);
  return counts;
}

try {
  if (process.argv.length > 3) throw new Error('Usage: node scripts/check-rendered-site.mjs [dist-directory]');
  const site = await loadSite(process.argv[2]);
  checkExpectedPages(site);
  checkInventory(site);
  const rendered = await checkRenderedContent(site);
  const redirects = checkRedirects(site);
  const metadata = checkMetadata(site);
  const search = checkPagefind(site);
  console.log(`pages=${site.pages.size}/222, documents=${site.counts.documents}/${EXPECTED_DOCUMENTS.size}, utf8-checked=${rendered.utf8}, charsets-checked=${rendered.charsets}, content-images-checked=${rendered.images}, language-options-checked=${rendered.options}, pagination-links-checked=${rendered.paginationLinks}, route-points-checked=${rendered.routePoints}, language-notices-checked=${rendered.notices}, sidebar-languages=${rendered.sidebarLanguages}, sidebar-groups=${rendered.sidebarGroups}, sidebar-items=${rendered.sidebarItems}, redirect-rules=${redirects}/223, html-lang-checked=${metadata.languages}, canonicals-checked=${metadata.canonicals}, hreflang-checked=${metadata.alternates}, pagefind-languages=${search.languages}/${LANGUAGES.length}, pagefind-pages=${search.pages}, pagefind-files-checked=${search.files}, broken=${site.errors}`);
  process.exitCode = site.errors ? 1 : 0;
} catch (error) {
  console.error(`check-rendered-site: ${error.message}`);
  process.exitCode = 1;
}
