import assert from 'node:assert/strict';
import { negotiate, overviewPathFor, redirectTo } from '../functions/_lib.js';
import { onRequest } from '../functions/index.js';

const cases = [
	['en-US', 'en'],
	['zh-TW', 'zh-tw'],
	['zh-CN', ''],
	['fr-CA', 'fr'],
	['de', 'de'],
	['ja-JP', 'ja'],
	['ko-KR', 'ko'],
	['pt-BR', 'pt'],
	['ru-RU', 'ru'],
	['de-DE;q=0.4,en-US;q=0.9,ja-JP;q=0.7', 'en'],
	['en-US;q=0,de-DE;q=0.8', 'de'],
	['xx-YY,zz;q=0.5', ''],
	['*', ''],
	['', ''],
	[null, ''],
	['zh-HK', 'zh-tw'],
	['zh-SG', ''],
	['de-DE;q=0.9,en-US;q=0.8', 'de'],
	['en-US;q=0.9,de-DE;q=0.9,fr-FR;q=0.8', 'en'],
	['es-MX', 'es'],
	['zh-Hant', 'zh-tw'],
	['zh-Hant-TW', 'zh-tw'],
	['zh-Hant-HK', 'zh-tw'],
	['zh-Hant-MO', 'zh-tw'],
	['zh-Hant-CN', 'zh-tw'],
	['zh-MO', 'zh-tw'],
	['zh-TW-x-test', 'zh-tw'],
	['zh-HK-x-test', 'zh-tw'],
	['zh-MO-x-test', 'zh-tw'],
	['zh_Hant', 'zh-tw'],
	['zh_Hant_TW', 'zh-tw'],
	['zh_TW', 'zh-tw'],
	['zh_HK', 'zh-tw'],
	['zh_MO', 'zh-tw'],
	[' ZH_hAnT_tw ', 'zh-tw'],
	['zh', ''],
	['zh-Hans', ''],
	['zh-Hans-CN', ''],
	['zh-Hans-TW', ''],
	['zh-Hans-HK', ''],
	['zh-Hans-MO', ''],
	['zh_Hans_TW', ''],
	['zh_CN', ''],
	['zh_SG', ''],
	['en_US', 'en'],
	['zh-Hant;q=0.4,en-US;q=0.9', 'en'],
	['zh-CN;q=0.9,zh-Hant;q=0.8', ''],
	['zh-Hant;q=0.9,zh-CN;q=0.8', 'zh-tw'],
	['zh-Hant;q=0,en;q=0.5', 'en'],
	['zh-Hans-TW;q=0.9,zh-MO;q=0.8', ''],
	['zh-MO;q=0.9,en;q=0.9', 'zh-tw'],
	['en;q=0.9,zh-Hant;q=0.9', 'en'],
	['xx,zh_Hant_TW;q=0.8', 'zh-tw'],
	['*;q=1,zh-HK;q=0.8', 'zh-tw'],
	['en;q=0,fr;q=0', ''],
	['en;q=invalid,fr;q=0.5', 'fr'],
	['en;q=1.5,fr;q=0.5', 'fr'],
	['en;q=-1,fr;q=0.5', 'fr'],
	['en;q=NaN,fr;q=0.5', 'fr'],
	['en; Q = 0.4,fr;q=0.8', 'fr'],
	[undefined, ''],
];

for (const [header, expected] of cases) {
	assert.equal(negotiate(header), expected, `negotiate(${JSON.stringify(header)})`);
}

const paths = [
	['', '/sonic/overview/'],
	['root', '/sonic/overview/'],
	['zh-tw', '/sonic/zh-tw/overview/'],
	['en', '/sonic/en/overview/'],
	['fr', '/sonic/fr/overview/'],
	['es', '/sonic/es/overview/'],
	['de', '/sonic/de/overview/'],
	['ja', '/sonic/ja/overview/'],
	['ko', '/sonic/ko/overview/'],
	['pt', '/sonic/pt/overview/'],
	['ru', '/sonic/ru/overview/'],
	[undefined, '/sonic/overview/'],
];

for (const [locale, expected] of paths) {
	assert.equal(overviewPathFor(locale), expected, `overviewPathFor(${JSON.stringify(locale)})`);
}

function assertRedirect(response, url, path) {
	assert.equal(response.status, 302);
	assert.equal(response.headers.get('location'), new URL(path, url).href);
	assert.equal(response.headers.get('vary'), 'Accept-Language');
	assert.equal(response.headers.get('cache-control'), 'no-store');
	assert.equal(response.headers.has('set-cookie'), false);
	assert.equal(response.body, null);
}

for (const url of ['https://docs.epocanvas.com/', 'http://127.0.0.1:4321/?from=test']) {
	for (const [, path] of paths) {
		assertRedirect(redirectTo(new Request(url), path), url, path);
	}
	for (const [header, locale] of cases) {
		const headers = typeof header === 'string' ? { 'Accept-Language': header } : {};
		const response = await onRequest({ request: new Request(url, { headers }) });
		assertRedirect(response, url, overviewPathFor(locale));
	}
}

console.log(`Language negotiation tests passed (${cases.length} negotiation cases, ${paths.length} path cases, ${2 * (cases.length + paths.length)} redirect/header cases).`);
