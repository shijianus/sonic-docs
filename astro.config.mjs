import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

// 站点来源：hreflang/canonical 需要绝对地址。发布到正式域名后只需改这两行，
// 并同步 public/robots.txt 的 Sitemap 行。
// 约定：与 EpomailDocs 相同的 docs.epocanvas.com 子路径范式，暂定 /sonic。
const SITE_ORIGIN = 'https://docs.epocanvas.com';
const SITE_BASE = '/sonic';

// Markdown 内的站点绝对链（/sonic/... 、/images/... 等）Astro 不会自动附加 base，
// 此插件在构建期为 href/src 统一加前缀；已是 base 前缀、协议链与纯锚点不处理。
function rehypePrefixBase() {
	const prefix = (url) => {
		if (!url.startsWith('/') || url.startsWith('//') || url.startsWith(SITE_BASE + '/')) return url;
		return SITE_BASE + url;
	};
	const walk = (node) => {
		if (!node || !Array.isArray(node.children)) return;
		for (const child of node.children) {
			if (child.type === 'element') {
				if (child.tagName === 'a' && typeof child.properties?.href === 'string') {
					child.properties.href = prefix(child.properties.href);
				}
				if (child.tagName === 'img' && typeof child.properties?.src === 'string') {
					child.properties.src = prefix(child.properties.src);
				}
				walk(child);
			}
		}
	};
	return (tree) => walk(tree);
}

// 侧边栏条目的多语言文案：label 为正式语言（简体中文），其余语言从 translations 取。
const SIDEBAR_I18N = {
	'专案介绍': {
		en: 'Project Overview', ja: 'プロジェクト紹介',
	},
	'总览': {
		en: 'Overview', ja: '総覧',
	},
	'隐私政策': {
		en: 'Privacy Policy', ja: 'プライバシーポリシー',
	},
	'用户条款': {
		en: 'Terms of Service', ja: '利用規約',
	},
	'可接受使用政策': {
		en: 'Acceptable Use Policy', ja: '受け入れ可能な利用ポリシー',
	},
	'数据处理与安全维护': {
		en: 'Data Processing & Security', ja: 'データ処理とセキュリティ',
	},
	'第三方共享与传输清单': {
		en: 'Third Parties & Transfers', ja: '第三者提供と国際伝送',
	},
	'用语定义': {
		en: 'Key Terms', ja: '用語定義',
	},
};
const SIDEBAR_GROUPS_I18N = {
	'产品与总览': {
		en: 'Product & Overview', ja: '製品と総覧',
	},
	'隐私与数据保护': {
		en: 'Privacy & Data Protection', ja: 'プライバシーとデータ保護',
	},
	'条款与合规': {
		en: 'Terms & Compliance', ja: '規約とコンプライアンス',
	},
};
const t = (label, slug) => ({ label, slug, translations: SIDEBAR_I18N[label] ?? {} });
const g = (label, items) => ({ label, translations: SIDEBAR_GROUPS_I18N[label] ?? {}, items });

export default defineConfig({
	site: SITE_ORIGIN,
	base: SITE_BASE,
	markdown: { rehypePlugins: [rehypePrefixBase] },
	// 纯文档站点用不到 Astro 开发工具栏
	devToolbar: { enabled: false },
	// 全站没有 <Image> 调用；passthrough 服务规避 sharp 原生依赖问题
	image: { service: passthroughImageService() },
	integrations: [
		starlight({
			title: 'Sonic',
			description: 'epocanvas sonic 官方法律文档——隐私政策、用户条款、可接受使用政策、数据安全与第三方共享清单，以欧盟 GDPR 为全体用户之最低资料保护标准',
			// 简体中文为默认语言（与产品内建 i18n 的 zh 一致），占用 URL 根路径；其余语言带目录前缀（如 /en/sonic/privacy-policy/）
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				en: { label: 'English', lang: 'en' },
				ja: { label: '日本語', lang: 'ja' },
			},
			logo: { src: './public/favicon.svg' },
			favicon: '/favicon.svg',
			social: { github: 'https://github.com/shijianus/sonic' },
			// 页面「最后更新于」时间戳取自构建时的 Git 提交历史
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				g('产品与总览', [
					t('专案介绍', 'project'),
					t('总览', 'overview'),
				]),
				g('隐私与数据保护', [
					t('隐私政策', 'privacy-policy'),
					t('数据处理与安全维护', 'data-security'),
					t('第三方共享与传输清单', 'sub-processors'),
				]),
				g('条款与合规', [
					t('用户条款', 'terms-of-service'),
					t('可接受使用政策', 'acceptable-use'),
					t('用语定义', 'key-terms'),
				]),
			],
		}),
	],
});
