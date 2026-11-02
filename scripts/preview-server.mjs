// 本地审计预览服务器：与生产 Cloudflare Pages 行为对齐——
// 1. 根路径按 Accept-Language 协商跳转至对应语言的总览（复用 functions/_lib.js 之协商逻辑）；
// 2. /sonic（无尾斜杠）308 至 /sonic/；
// 3. 以 dist/ 为根静态伺服，目录回退 index.html，未命中回退 404.html。
// 用法：node scripts/preview-server.mjs [port]（缺省 4321）
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { onRequest } from '../functions/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '..', 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4321);

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
		let pathname;
		try {
			pathname = decodeURIComponent(url.pathname);
		} catch {
			res.writeHead(400).end('Bad Request');
			return;
		}

		// 根路径直接执行生产入口；缺少 Accept-Language 时也走同一函数。
		if (pathname === '/') {
			const headers = new Headers();
			for (const [name, value] of Object.entries(req.headers)) {
				if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
			}
			const response = await onRequest({ request: new Request(url, { headers }) });
			res.writeHead(response.status, Object.fromEntries(response.headers));
			res.end();
			return;
		}
		// 无尾斜杠的 base 根：308 规范化
		if (pathname === BASE) {
			res.writeHead(308, { location: BASE + '/' + url.search });
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
		if (/[\\\x00-\x1f\x7f:]/.test(rest)) {
			res.writeHead(403).end('Forbidden');
			return;
		}
		let filePath = resolve(dist, rest);
		const relativePath = relative(dist, filePath);
		if (relativePath === '..' || relativePath.startsWith('..' + sep) || isAbsolute(relativePath)) {
			res.writeHead(403).end('Forbidden');
			return;
		}

		let st = await stat(filePath).catch(() => null);
		if (st && st.isDirectory()) {
			filePath = join(filePath, 'index.html');
			st = await stat(filePath).catch(() => null);
		}
		if (!st && !extname(filePath)) {
			filePath += '.html';
			st = await stat(filePath).catch(() => null);
		}
		if (!st?.isFile()) {
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
