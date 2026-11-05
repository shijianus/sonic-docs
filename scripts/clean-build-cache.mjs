// 清除 Astro 内容与构建缓存，确保 rehype/组件改动完整作用于全部 220 页。
// Astro 的增量缓存不跟踪 Markdown 插件依赖；不做全量构建时可能复用旧 HTML。
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const caches = [
  fileURLToPath(new URL('../.astro/', import.meta.url)),
  fileURLToPath(new URL('../node_modules/.astro/', import.meta.url)),
];

for (const directory of caches) {
  await rm(directory, { recursive: true, force: true });
}
