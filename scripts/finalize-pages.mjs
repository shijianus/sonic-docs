import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import checks from './validate-anchors.cjs';

const { SITE_BASE, LANGUAGES, DOCUMENTS, documentFile, documentUrl } = checks;
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const source = readFileSync(join(root, 'public', '_redirects'), 'utf8');
const staticRules = source.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
const fallback = `${SITE_BASE}/* /:splat 200`;
if (staticRules.at(-1) !== fallback) throw new Error('The base rewrite must be the final public/_redirects rule.');

// Pages canonicalizes the rewritten path, so add public-URL redirects first.
const canonicalRules = LANGUAGES.flatMap(language => DOCUMENTS.map(slug => {
  const target = documentUrl(language, slug).pathname;
  if (!existsSync(join(dist, documentFile(language, slug)))) throw new Error(`Missing redirect target ${target}`);
  return `${target.slice(0, -1)} ${target} 308`;
}));
const localeRules = LANGUAGES.filter(language => language.directory).flatMap(language => {
  const target = documentUrl(language, 'overview').pathname;
  const prefix = `${SITE_BASE}/${language.directory}`;
  return [`${prefix} ${target} 302`, `${prefix}/ ${target} 302`];
});
const rules = [...staticRules.slice(0, -1), ...canonicalRules, ...localeRules, fallback];
writeFileSync(join(dist, '_redirects'), rules.join('\n') + '\n', 'utf8');
console.log(`Pages routing: ${canonicalRules.length} canonical redirects, ${localeRules.length} locale entry redirects, ${staticRules.length} base rules.`);
