# -*- coding: utf-8 -*-
"""Rebuild sidebar to 6 groups / 22 entries; extend checker; bump versions to 1.5."""
from pathlib import Path
import re

p = Path('astro.config.mjs')
t = p.read_text(encoding='utf-8')

new_labels = """	'搜索与规则参考': {
		'zh-tw': '搜尋與規則參考', 'en': 'Search & Rules Reference', 'fr': 'Référence de recherche et des règles', 'es': 'Referencia de búsqueda y reglas', 'de': 'Such- & Regelreferenz', 'ja': '検索とルール参照', 'ko': '검색 및 규칙 참조', 'pt': 'Referência de pesquisa e regras', 'ru': 'Поиск и правила',
	},
	'音乐库管理': {
		'zh-tw': '音樂庫管理', 'en': 'Music Library Management', 'fr': 'Gestion de la bibliothèque', 'es': 'Gestión de la biblioteca', 'de': 'Musikbibliothek verwalten', 'ja': 'ミュージックライブラリ管理', 'ko': '음악 라이브러리 관리', 'pt': 'Gestão da biblioteca de música', 'ru': 'Управление медиатекой',
	},
	'移动端指南': {
		'zh-tw': '行動裝置指南', 'en': 'Mobile Guide', 'fr': 'Guide mobile', 'es': 'Guía móvil', 'de': 'Mobile Leitfaden', 'ja': 'モバイルガイド', 'ko': '모바일 가이드', 'pt': 'Guia móvel', 'ru': 'Мобильное руководство',
	},
	'推荐算法说明': {
		'zh-tw': '推薦演算法說明', 'en': 'Recommendation Algorithm', 'fr': 'Algorithme de recommandation', 'es': 'Algoritmo de recomendación', 'de': 'Empfehlungsalgorithmus', 'ja': 'レコメンドアルゴリズム', 'ko': '추천 알고리즘 설명', 'pt': 'Algoritmo de recomendação', 'ru': 'Алгоритм рекомендаций',
	},
	'帐户与安全指南': {
		'zh-tw': '帳戶與安全指南', 'en': 'Account & Security Guide', 'fr': 'Compte et sécurité', 'es': 'Cuenta y seguridad', 'de': 'Konto & Sicherheit', 'ja': 'アカウントとセキュリティ', 'ko': '계정 및 보안 가이드', 'pt': 'Conta e segurança', 'ru': 'Аккаунт и безопасность',
	},
	'数据导出与存储': {
		'zh-tw': '資料匯出與儲存', 'en': 'Data Export & Storage', 'fr': 'Export et stockage des données', 'es': 'Exportación y almacenamiento de datos', 'de': 'Datenexport & Speicherung', 'ja': 'データ書き出しと保存', 'ko': '데이터 내보내기 및 저장', 'pt': 'Exportação e armazenamento de dados', 'ru': 'Экспорт и хранение данных',
	},
	'故障排查': {
		'zh-tw': '疑難排解', 'en': 'Troubleshooting', 'fr': 'Dépannage', 'es': 'Solución de problemas', 'de': 'Fehlerbehebung', 'ja': 'トラブルシューティング', 'ko': '문제 해결', 'pt': 'Resolução de problemas', 'ru': 'Устранение неполадок',
	},
"""
anchor = "\t'用语定义': {"
assert anchor in t, 'anchor label not found'
t = t.replace(anchor, new_labels + anchor, 1)

old_sidebar = re.search(r"\t\t\tsidebar: \[.*?\n\t\t\t\],", t, re.S).group(0)
new_sidebar = """			sidebar: [
				g('产品与总览', [
					t('专案介绍', 'project'),
					t('界面与功能导览', 'interface'),
					t('总览', 'overview'),
				]),
				g('使用指南', [
					t('快速上手', 'quickstart'),
					t('功能指南', 'features'),
					t('搜索与规则参考', 'search-syntax'),
					t('音乐库管理', 'library'),
					t('移动端指南', 'mobile'),
					t('故障排查', 'troubleshooting'),
				]),
				g('帐户与个性化', [
					t('帐户与安全指南', 'account-security'),
					t('推荐算法说明', 'recommendation'),
					t('数据导出与存储', 'data-management'),
				]),
				g('隐私与数据保护', [
					t('隐私政策', 'privacy-policy'),
					t('数据处理与安全维护', 'data-security'),
					t('第三方共享与传输清单', 'sub-processors'),
				]),
				g('条款与合规', [
					t('用户条款', 'terms-of-service'),
					t('可接受使用政策', 'acceptable-use'),
					t('开源与自行部署法律', 'open-source'),
					t('用语定义', 'key-terms'),
				]),
				g('自部署与开发', [
					t('部署指南', 'deployment'),
					t('开发指南', 'development'),
					t('开放平台与 API 接入', 'api'),
				]),
			],"""
t = t.replace(old_sidebar, new_sidebar, 1)
p.write_text(t, encoding='utf-8')
print('sidebar rebuilt: 6 groups, 22 entries')

sp = Path('scripts/check-structure.py')
st = sp.read_text(encoding='utf-8')
st = st.replace('"acceptable-use", "data-security", "sub-processors", "open-source", "deployment", "development", "key-terms"]',
'"acceptable-use", "data-security", "sub-processors", "open-source", "deployment", "development",\n        "search-syntax", "library", "mobile", "recommendation", "account-security", "data-management", "troubleshooting", "key-terms"]')
sp.write_text(st, encoding='utf-8')
print('checker patched: 22 docs')

bumps = [
    ('src/content/docs/*.md', '生效日期：2026 年 11 月 1 日｜版本：1.4', '生效日期：2026 年 11 月 2 日｜版本：1.5'),
    ('src/content/docs/en/*.md', 'Effective date: 1 November 2026｜Version: 1.4', 'Effective date: 2 November 2026｜Version: 1.5'),
    ('src/content/docs/ja/*.md', '発効日：2026年11月1日｜バージョン：1.4', '発効日：2026年11月2日｜バージョン：1.5'),
    ('src/content/docs/zh-tw/*.md', '生效日期：2026 年 11 月 1 日｜版本：1.4', '生效日期：2026 年 11 月 2 日｜版本：1.5'),
    ('src/content/docs/fr/*.md', "Date d'entrée en vigueur : 1er novembre 2026｜Version : 1.4", "Date d'entrée en vigueur : 2 novembre 2026｜Version : 1.5"),
    ('src/content/docs/es/*.md', 'Fecha de entrada en vigor: 1 de noviembre de 2026｜Versión: 1.4', 'Fecha de entrada en vigor: 2 de noviembre de 2026｜Versión: 1.5'),
    ('src/content/docs/de/*.md', 'Datum des Inkrafttretens: 1. November 2026｜Version: 1.4', 'Datum des Inkrafttretens: 2. November 2026｜Version: 1.5'),
    ('src/content/docs/ko/*.md', '시행일: 2026년 11월 1일｜버전: 1.4', '시행일: 2026년 11월 2일｜버전: 1.5'),
    ('src/content/docs/pt/*.md', 'Data de entrada em vigor: 1 de novembro de 2026｜Versão: 1.4', 'Data de entrada em vigor: 2 de novembro de 2026｜Versão: 1.5'),
    ('src/content/docs/ru/*.md', 'Дата вступления в силу: 1 ноября 2026 г.｜Версия: 1.4', 'Дата вступления в силу: 2 ноября 2026 г.｜Версия: 1.5'),
]
n = 0
for glob, old, new in bumps:
    for f in Path('.').glob(glob):
        s = f.read_text(encoding='utf-8')
        if old in s:
            f.write_text(s.replace(old, new), encoding='utf-8')
            n += 1
print('version bumped files:', n)
