// 语言协商共享逻辑：根据 Accept-Language 头把访客送往其浏览器所选受支持语言的入口页。
// 无匹配时缺省简体中文（站点默认语言）。不使用 Cookie，符合隐私政策「不以 Cookie 识别」之承诺。
const LOCALES = ['en', 'ja'];
const DEFAULT_PATH = '/sonic/overview/';

export function overviewPathFor(locale) {
	return locale ? `/sonic/${locale}/overview/` : DEFAULT_PATH;
}

export function negotiate(acceptLanguage) {
	if (!acceptLanguage) return '';
	// 解析形如 "en-US,en;q=0.9,zh-CN;q=0.8" 的加权标签列表，按权重降序匹配
	const tags = acceptLanguage
		.split(',')
		.map((part) => {
			const [tag, ...params] = part.trim().split(';');
			let q = 1;
			for (const p of params) {
				const m = p.trim().match(/^q=([\d.]+)$/);
				if (m) q = parseFloat(m[1]);
			}
			return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
		})
		.filter((t) => t.tag && t.q > 0)
		.sort((a, b) => b.q - a.q);
	for (const { tag } of tags) {
		for (const loc of LOCALES) {
			if (tag.startsWith(loc)) return loc;
		}
	}
	// 中文（zh-CN/zh-TW/zh 等）一律使用简中默认版；其余未匹配语言同样缺省简中
	return '';
}

export function redirectTo(request, path) {
	const url = new URL(request.url);
	return Response.redirect(new URL(path, url).toString(), 302);
}
