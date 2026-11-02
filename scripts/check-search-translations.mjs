import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('../src/content/i18n/', import.meta.url);
const locales = ['zh-CN', 'zh-TW', 'en', 'fr', 'es', 'de', 'ja', 'ko', 'pt', 'ru'];
const keys = [
  'pagefind.clear_search', 'pagefind.load_more', 'pagefind.search_label', 'pagefind.filters_label',
  'pagefind.zero_results', 'pagefind.one_result', 'pagefind.many_results',
  'pagefind.alt_search', 'pagefind.search_suggestion', 'pagefind.searching',
];

for (const locale of locales) {
  const file = new URL(`${locale}.json`, root);
  assert(fs.existsSync(file), `Missing Pagefind translations for ${locale}`);
  const translations = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const key of keys) {
    assert.equal(typeof translations[key], 'string', `${locale}: missing ${key}`);
    assert(translations[key].trim(), `${locale}: empty ${key}`);
  }
  for (const key of ['pagefind.zero_results', 'pagefind.one_result', 'pagefind.many_results', 'pagefind.alt_search', 'pagefind.search_suggestion', 'pagefind.searching']) {
    assert(translations[key].includes('[SEARCH_TERM]'), `${locale}: ${key} must retain [SEARCH_TERM]`);
  }
  for (const key of ['pagefind.one_result', 'pagefind.many_results']) {
    assert(translations[key].includes('[COUNT]'), `${locale}: ${key} must retain [COUNT]`);
  }
  if (locale !== 'en') {
    assert(!Object.values(translations).some(value => /^(?:Clear|Load more results|No results for \[SEARCH_TERM\]|\[COUNT\] results for \[SEARCH_TERM\])$/.test(value)), `${locale}: English Pagefind fallback remains`);
  }
}

console.log(`Pagefind UI translations cover ${locales.length} locales and ${keys.length} labels.`);
