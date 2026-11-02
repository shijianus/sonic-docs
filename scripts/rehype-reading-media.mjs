import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readingLabels } from '../src/lib/reading-labels.mjs';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const sizes = new Map();

function imageSize(source) {
  if (sizes.has(source)) return sizes.get(source);
  const filename = resolve(publicDir, '.' + source);
  if (!filename.startsWith(publicDir.endsWith(sep) ? publicDir : publicDir + sep)) {
    throw new Error(`Image outside public directory: ${source}`);
  }
  const bytes = readFileSync(filename);
  let size;
  if (source.endsWith('.svg')) {
    const viewBox = bytes.toString('utf8').match(/\bviewBox=["']\s*[-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)\s*["']/);
    if (viewBox) size = [Number(viewBox[1]), Number(viewBox[2])];
  } else if (source.endsWith('.png') && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    size = [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
  }
  if (!size?.every(value => Number.isFinite(value) && value > 0)) {
    throw new Error(`Missing image dimensions: ${source}`);
  }
  sizes.set(source, size);
  return size;
}

export default function rehypeReadingMedia({ base = '/sonic' } = {}) {
  return (tree, file) => {
    const segments = String(file.path || '').replaceAll('\\', '/').split('/');
    const directory = segments.at(-2);
    const language = directory === 'zh-tw' ? 'zh-TW' : directory === 'docs' ? 'zh-CN' : directory;
    const labels = readingLabels[language] || readingLabels.en;
    let images = 0;
    function visit(parent) {
      for (let index = 0; index < (parent.children || []).length; index++) {
        const node = parent.children[index];
        if (node.type !== 'element') continue;
        if (node.tagName === 'img') {
          const url = node.properties?.src;
          if (typeof url !== 'string') continue;
          const source = url.startsWith(base + '/') ? url.slice(base.length) : url;
          if (!source.startsWith('/images/sonic/')) continue;
          const [width, height] = imageSize(source);
          const alt = String(node.properties.alt || '').trim();
          if (!alt) throw new Error(`Missing localized image description: ${file.path} (${source})`);
          Object.assign(node.properties, { width, height, decoding: 'async', loading: images++ === 0 ? 'eager' : 'lazy' });
          if (parent.tagName !== 'a') {
            parent.children[index] = {
              type: 'element', tagName: 'a',
              properties: { href: url, className: ['doc-figure-link'], 'data-doc-image': '', ariaLabel: `${labels.view}: ${alt}` },
              children: [node, { type: 'element', tagName: 'span', properties: { className: ['doc-figure-action'], ariaHidden: 'true' }, children: [{ type: 'text', value: labels.view }] }],
            };
          }
        } else {
          visit(node);
        }
      }
    }
    visit(tree);
  };
}
