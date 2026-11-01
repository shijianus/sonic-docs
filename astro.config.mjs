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

// 侧边栏条目的多语言文案：label 为正式语言（简体中文），其余 9 种语言从 translations 取（与 EpoCanvasDocs 十语言矩阵一致）。
const SIDEBAR_I18N = {
	'专案介绍': {
		'zh-tw': '專案介紹',
		fr: 'Présentation du projet',
		es: 'Presentación del proyecto',
		de: 'Projektvorstellung',
		ko: '프로젝트 소개',
		pt: 'Apresentação do projeto',
		ru: 'О проекте',
	},
	'界面与功能导览': {
		'zh-tw': '介面與功能導覽',
		fr: "Guide de l\'interface et des fonctions",
		es: 'Guía de la interfaz y funciones',
		de: 'Oberfläche & Funktionen',
		ko: '화면 및 기능 안내',
		pt: 'Guia da interface e funções',
		ru: 'Интерфейс и функции',
	},
	'总览': {
		'zh-tw': '總覽',
		fr: 'Aperçu',
		es: 'Descripción general',
		de: 'Überblick',
		ko: '개요',
		pt: 'Visão geral',
		ru: 'Обзор',
	},
	'隐私政策': {
		'zh-tw': '隱私權政策',
		fr: 'Politique de confidentialité',
		es: 'Política de privacidad',
		de: 'Datenschutzerklärung',
		ko: '개인정보 처리방침',
		pt: 'Política de Privacidade',
		ru: 'Политика конфиденциальности',
	},
	'用户条款': {
		'zh-tw': '使用條款',
		fr: "Conditions d\'utilisation",
		es: 'Términos del servicio',
		de: 'Nutzungsbedingungen',
		ko: '이용약관',
		pt: 'Termos de Serviço',
		ru: 'Условия использования',
	},
	'可接受使用政策': {
		'zh-tw': '可接受使用政策',
		fr: "Politique d\'utilisation acceptable",
		es: 'Política de uso aceptable',
		de: 'Richtlinie zur akzeptablen Nutzung',
		ko: '수용 가능한 사용 정책',
		pt: 'Política de Utilização Aceitável',
		ru: 'Политика допустимого использования',
	},
	'数据处理与安全维护': {
		'zh-tw': '資料處理與安全維護',
		fr: 'Traitement des données et sécurité',
		es: 'Tratamiento de datos y seguridad',
		de: 'Datenverarbeitung & Sicherheit',
		ko: '데이터 처리 및 보안',
		pt: 'Tratamento de Dados e Segurança',
		ru: 'Обработка данных и безопасность',
	},
	'第三方共享与传输清单': {
		'zh-tw': '第三方共享與傳輸清單',
		fr: 'Sous-traitants et transferts',
		es: 'Terceros y transferencias',
		de: 'Dritte & Übermittlungen',
		ko: '제3자 제공 및 국제 이전',
		pt: 'Terceiros e transferências',
		ru: 'Третьи лица и передача данных',
	},
	'用语定义': {
		'zh-tw': '用語定義',
		fr: 'Définitions',
		es: 'Glosario',
		de: 'Begriffsdefinitionen',
		ko: '용어 정의',
		pt: 'Definições',
		ru: 'Глоссарий',
	},
};
const SIDEBAR_GROUPS_I18N = {
	'产品与总览': {
		'zh-tw': '產品與總覽',
		fr: 'Produit et aperçu',
		es: 'Producto y descripción general',
		de: 'Produkt & Überblick',
		ko: '제품 및 개요',
		pt: 'Produto e visão geral',
		ru: 'Продукт и обзор',
	},
	'隐私与数据保护': {
		'zh-tw': '隱私與資料保護',
		fr: 'Confidentialité et protection des données',
		es: 'Privacidad y protección de datos',
		de: 'Privatsphäre und Datenschutz',
		ko: '프라이버시와 데이터 보호',
		pt: 'Privacidade e proteção de dados',
		ru: 'Конфиденциальность и защита данных',
	},
	'条款与合规': {
		'zh-tw': '條款與合規',
		fr: 'Conditions et conformité',
		es: 'Términos y cumplimiento',
		de: 'Bedingungen & Compliance',
		ko: '규정 및 컴플라이언스',
		pt: 'Termos e conformidade',
		ru: 'Условия и соответствие',
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
				'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
				en: { label: 'English', lang: 'en' },
				fr: { label: 'Français', lang: 'fr' },
				es: { label: 'Español', lang: 'es' },
				de: { label: 'Deutsch', lang: 'de' },
				ja: { label: '日本語', lang: 'ja' },
				ko: { label: '한국어', lang: 'ko' },
				pt: { label: 'Português', lang: 'pt' },
				ru: { label: 'Русский', lang: 'ru' },
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
					t('界面与功能导览', 'interface'),
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
