import fs from 'node:fs';

const config = fs.readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
// Starlight resolves translations by the locale's lang tag, not its URL directory.
const locales = ['zh-TW', 'en', 'fr', 'es', 'de', 'ja', 'ko', 'pt', 'ru'];
const itemLabels = [
	'项目介绍',
	'界面与功能导览',
	'总览',
	'隐私政策',
	'用户条款',
	'可接受使用政策',
	'数据处理与安全维护',
	'第三方共享与传输清单',
	'快速上手',
	'功能指南',
	'开放平台与 API 接入',
	'部署指南',
	'开发指南',
	'开源与自行部署法律',
	'搜索与规则参考',
	'音乐库管理',
	'移动端指南',
	'推荐算法说明',
	'账户与安全指南',
	'数据导出与存储',
	'故障排查',
	'用语定义',
];
const groupLabels = ['产品与总览', '使用指南', '账户与个性化', '隐私与数据保护', '条款与合规', '自部署与开发'];

function section(name, nextName = '') {
	const marker = `const ${name} = {`;
	const start = config.indexOf(marker);
	if (start < 0) throw new Error(`Missing ${name}`);
	const next = nextName ? config.indexOf(`const ${nextName} = {`, start + marker.length) : -1;
	const end = next >= 0 ? next : config.indexOf('\nconst t =', start);
	if (end < 0) throw new Error(`Unterminated ${name}`);
	return config.slice(start, end);
}

function entryBlock(source, label) {
	const marker = `\n\t'${label}': {`;
	const start = source.indexOf(marker);
	if (start < 0) return null;
	const end = source.indexOf('\n\t},', start + marker.length);
	return end < 0 ? null : source.slice(start, end);
}

function hasLocale(block, locale) {
	const escaped = locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`(?:['"]?${escaped}['"]?)\\s*:`).test(block);
}

const missing = [];
const itemSource = section('SIDEBAR_I18N', 'SIDEBAR_GROUPS_I18N');
const groupSource = section('SIDEBAR_GROUPS_I18N');
for (const [kind, labels, source] of [
	['item', itemLabels, itemSource],
	['group', groupLabels, groupSource],
]) {
	for (const label of labels) {
		const block = entryBlock(source, label);
		if (!block) {
			missing.push(`${kind} ${label}: missing entry`);
			continue;
		}
		if (hasLocale(block, 'zh-tw')) missing.push(`${kind} ${label}: use zh-TW, not the zh-tw directory key`);
		for (const locale of locales) {
			if (!hasLocale(block, locale)) missing.push(`${kind} ${label}: missing ${locale}`);
		}
	}
}

if (missing.length) {
	console.error(missing.join('\n'));
	process.exit(1);
}

console.log(`Sidebar translations cover ${itemLabels.length} items and ${groupLabels.length} groups across ${locales.length + 1} locales.`);
