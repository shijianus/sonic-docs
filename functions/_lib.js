// 语言协商共享逻辑：根据 Accept-Language 头把访客送往其浏览器所选受支持语言的入口页。
// 无匹配时缺省简体中文（站点默认语言）。此入口不设置语言 Cookie。
const DEFAULT_PATH = '/sonic/overview/';
const LANGUAGE_TO_LOCALE = new Map([
	['en', 'en'],
	['fr', 'fr'],
	['es', 'es'],
	['de', 'de'],
	['ja', 'ja'],
	['ko', 'ko'],
	['pt', 'pt'],
	['ru', 'ru'],
]);

export function overviewPathFor(locale) {
	return !locale || locale === 'root' ? DEFAULT_PATH : `/sonic/${locale}/overview/`;
}

function localeForTag(tag) {
	const normalized = tag.trim().toLowerCase().replaceAll('_', '-');
	if (!normalized || normalized === '*') return undefined;

	const [language, scriptOrRegion] = normalized.split('-');
	if (language === 'zh') {
		// 显式字体系优先于地区推断；未指定字体系时，台港澳使用繁体。
		if (scriptOrRegion === 'hant') return 'zh-tw';
		if (scriptOrRegion === 'hans') return '';
		return ['tw', 'hk', 'mo'].includes(scriptOrRegion) ? 'zh-tw' : '';
	}

	return LANGUAGE_TO_LOCALE.get(language);
}

export function negotiate(acceptLanguage) {
	if (typeof acceptLanguage !== 'string' || !acceptLanguage.trim()) return '';

	// 解析形如 "en-US,en;q=0.9,zh-CN;q=0.8" 的加权标签列表，按权重降序匹配。
	const tags = acceptLanguage
		.split(',')
		.map((part, index) => {
			const [tag, ...params] = part.trim().split(';');
			let q = 1;
			for (const parameter of params) {
				const [name, value] = parameter.trim().split('=', 2);
				if (name?.trim().toLowerCase() !== 'q') continue;
				const parsed = Number(value?.trim());
				q = Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : 0;
			}
			return { tag: tag.trim(), q, index };
		})
		.filter((item) => item.tag && item.q > 0)
		.sort((a, b) => b.q - a.q || a.index - b.index);

	for (const { tag } of tags) {
		const locale = localeForTag(tag);
		if (locale !== undefined) return locale;
	}

	// 未知语言、通配符或只有 q=0 的语言范围均回落简体中文。
	return '';
}

export function redirectTo(request, path) {
	const url = new URL(request.url);
	return new Response(null, {
		status: 302,
		headers: {
			Location: new URL(path, url).toString(),
			Vary: 'Accept-Language',
			'Cache-Control': 'no-store',
		},
	});
}
