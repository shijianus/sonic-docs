// 本地审计预览服务器：与生产 Cloudflare Pages 行为对齐——
// 1. 根路径按 Accept-Language 协商跳转至对应语言的总览（复用 functions/_lib.js 之协商逻辑）；
// 2. /sonic（无尾斜杠）308 至 /sonic/；
// 3. 以 dist/ 为根静态伺服，目录回退 index.html，未命中回退 404.html。
// 用法：node scripts/preview-server.mjs [port]（缺省 4321）
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '..', 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4321);
const require = createRequire(import.meta.url);

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.map': 'application/json; charset=utf-8',
	'.gz': 'application/gzip',
	'.webmanifest': 'application/manifest+json',
};

// 复用 functions/_lib.js 的语言协商（纯 ESM，无 Cloudflare 专属 API）
const { negotiate, overviewPathFor } = await import(
	new URL('../functions/_lib.js', import.meta.url).href
);

async function serveFile(res, filePath, status = 200) {
	const body = await readFile(filePath);
	res.writeHead(status, {
		'content-type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
		'content-length': body.length,
	});
	res.end(body);
}

const server = createServer(async (req, res) => {
	try {
		const url = new URL(req.url, `http://${req.headers.host}`);
		const BASE = '/sonic'; // 与 astro.config.mjs 之 SITE_BASE 一致；dist 为扁平结构，base 由本服务器运行时映射
		const pathname = decodeURIComponent(url.pathname);

		// 根路径：语言协商跳转（与生产 functions/index.js 一致）
		if (pathname === '/' || pathname === '') {
			const target = overviewPathFor(negotiate(req.headers['accept-language'] || ''));
			res.writeHead(302, { location: target });
			res.end();
			return;
		}
		// 无尾斜杠的 base 根：308 规范化
		if (pathname === BASE) {
			res.writeHead(308, { location: BASE + '/' });
			res.end();
			return;
		}
		// base 之外之路径：404（站点只存在于 /sonic/ 之下）
		if (!pathname.startsWith(BASE + '/')) {
			await serveFile(res, join(dist, '404.html'), 404).catch(() => res.writeHead(404).end('Not Found'));
			return;
		}

		// 剥离 base 前缀后映射进 dist
		const rest = pathname.slice(BASE.length + 1);
		const safePath = normalize(rest).replace(/^([/\\])+/, '');
		let filePath = safePath ? join(dist, safePath) : join(dist, 'index.html');
		if (!filePath.startsWith(dist)) {
			res.writeHead(403).end('Forbidden');
			return;
		}

		let st = await stat(filePath).catch(() => null);
		if (st && st.isDirectory()) {
			filePath = join(filePath, 'index.html');
			st = await stat(filePath).catch(() => null);
		}
		if (!st) {
			// 未命中：回退 404 页面（保持 Starlight 404 版式）
			const notFound = join(dist, '404.html');
			await serveFile(res, notFound, 404).catch(() => {
				res.writeHead(404).end('Not Found');
			});
			return;
		}
		await serveFile(res, filePath);
	} catch (err) {
		res.writeHead(500).end('Internal Server Error');
		console.error(err);
	}
});

server.listen(port, '127.0.0.1', () => {
	console.log(`SonicDocs audit preview: http://127.0.0.1:${port}/  (dist: ${dist})`);
});
void require;
