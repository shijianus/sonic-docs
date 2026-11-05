import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readingLabels } from '../src/lib/reading-labels.mjs';
import { diagramLegendItems } from '../src/lib/diagram-legends.mjs';

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
    let figures = 0;
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
          const loading = figures++ === 0 ? 'eager' : 'lazy';
          Object.assign(node.properties, { width, height, decoding: 'async', loading, className: ['doc-figure-img', 'doc-figure-img--light'] });
          const children = [node];
          // 图示另有深色版本时同时输出两幅，由站点主题 CSS 选择显示，避免只跟随操作系统主题。
          const darkSource = source.replace(/\.svg$/, '-dark.svg');
          const hasDark = darkSource !== source && existsSync(resolve(publicDir, '.' + darkSource));
          if (hasDark) {
            const [darkWidth, darkHeight] = imageSize(darkSource);
            children.push({
              type: 'element', tagName: 'img',
              properties: {
                src: base + darkSource, alt, width: darkWidth, height: darkHeight,
                decoding: 'async', loading, className: ['doc-figure-img', 'doc-figure-img--dark'],
              },
              children: [],
            });
          }
          if (parent.tagName !== 'a') {
            parent.children[index] = {
              type: 'element', tagName: 'a',
              properties: {
                href: url,
                className: ['doc-figure-link'],
                'data-doc-image': '',
                'data-doc-dark-src': hasDark ? base + darkSource : '',
                ariaLabel: `${labels.view}: ${alt}`,
              },
              children: [...children, { type: 'element', tagName: 'span', properties: { className: ['doc-figure-action'], ariaHidden: 'true' }, children: [{ type: 'text', value: labels.view }] }],
            };
            // 图示编号在 SVG 内保持简短技术标签，页内图例按当前语言给出对应含义。
            const diagram = source.match(/\/images\/sonic\/([^/]+)\.svg$/)?.[1];
            const items = diagram ? diagramLegendItems(diagram, language) : [];
            if (items.length) {
              const legend = [
                { type: 'element', tagName: 'span', properties: { className: ['doc-figure-legend-label'] }, children: [{ type: 'text', value: labels.legend }] },
                ...items.map(item => ({
                  type: 'element', tagName: 'span',
                  properties: { className: ['doc-figure-legend-item'] },
                  children: [{ type: 'text', value: item }],
                })),
              ];
              parent.children.splice(index + 1, 0, {
                type: 'element', tagName: 'span',
                properties: { className: ['doc-figure-legend'] },
                children: legend,
              });
              index += 1;
            }
          }
        } else {
          visit(node);
        }
      }
    }
    visit(tree);
  };
}
