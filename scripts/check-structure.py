# -*- coding: utf-8 -*-
"""Validate the fixed 10-locale x 22-page documentation contract.

Standard library only. Markdown is scanned by block, excluding frontmatter,
comments and fenced examples from structural comparisons. The small, reviewed
concept vocabulary below deliberately applies only to named sections/cells; it
is not a translation, legal or deployment audit.

Usage: python scripts/check-structure.py [--self-test]
"""
import argparse
import json
import re
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
ROOT = PROJECT / "src" / "content" / "docs"
CONFIG = PROJECT / "astro.config.mjs"
LOCALES = {
    "root": "zh-CN", "zh-tw": "zh-TW", "en": "en", "fr": "fr", "es": "es",
    "de": "de", "ja": "ja", "ko": "ko", "pt": "pt", "ru": "ru",
}
SYMMETRIC_LANGS = [".", *list(LOCALES)[1:]]
DOCS = [
    "project", "interface", "overview", "quickstart", "features", "api",
    "privacy-policy", "terms-of-service", "acceptable-use", "data-security",
    "sub-processors", "open-source", "deployment", "development", "search-syntax",
    "library", "mobile", "recommendation", "account-security", "data-management",
    "troubleshooting", "key-terms",
]
REVISION = "2026-11-02"
VERSION = "1.8"
# Label, controlled local date spelling, version label. ISO is also accepted,
# but only in the first body block's revision declaration, never elsewhere.
METADATA = {
    ".": ("修订日期", r"2026\s*年\s*11\s*月\s*0?2\s*日", "版本"),
    "zh-tw": ("修訂日期", r"2026\s*年\s*11\s*月\s*0?2\s*日", "版本"),
    "en": ("Revision date", r"0?2 November 2026", "Version"),
    "fr": ("Date de révision", r"0?2 novembre 2026", "Version"),
    "es": ("Fecha de revisión", r"0?2 de noviembre de 2026", "Versión"),
    "de": ("Überarbeitet am", r"0?2\. November 2026", "Version"),
    "ja": ("改訂日", r"2026\s*年\s*11\s*月\s*0?2\s*日", "バージョン"),
    "ko": ("개정일", r"2026\s*년\s*11\s*월\s*0?2\s*일", "버전"),
    "pt": ("Data de revisão", r"0?2 de novembro de 2026", "Versão"),
    "ru": ("Дата (?:пересмотра|редакции)", r"0?2 ноября 2026(?: г\.)?", "Версия"),
}
# Each tuple must occur within ONE sentence (probe/fallback/scrub) or ONE
# table effect cell (filter/block). Keep negations together with their claim.
CONCEPTS = {
    ".": {
        "probe": ("30 秒只是再次探测", "不保证恢复"),
        "fallback": ("备援路径也可能失败",),
        "public": ("公开 Issue", "只提供不敏感的重现词"),
        "scrub": ("发布前请移除或遮蔽", "电子邮件地址", "个人资料", "会话 Cookie", "API Key", "截图"),
        "filter": ("仅在可用身份与功能范围内过滤相符推荐",),
        "block": ("不承诺永久全面封锁",),
    },
    "zh-tw": {
        "probe": ("30 秒只是再次探測", "不保證恢復"),
        "fallback": ("備援路徑也可能失敗",),
        "public": ("公開 Issue", "只提供不敏感的重現詞"),
        "scrub": ("發布前請移除或遮蔽", "電子郵件地址", "個人資料", "工作階段 Cookie", "API Key", "截圖"),
        "filter": ("僅在可用身分與功能範圍內過濾相符推薦",),
        "block": ("不承諾永久全面封鎖",),
    },
    "en": {
        "probe": ("30-second", "only another probe", "not a recovery guarantee"),
        "fallback": ("fallback can also fail",),
        "public": ("public Issue", "only non-sensitive reproduction terms"),
        "scrub": ("remove or redact", "email addresses", "personal or profile data", "session cookies", "API keys", "screenshots"),
        "filter": ("Filters matching recommendations only within the available identity and feature scope",),
        "block": ("does not promise a permanent universal block",),
    },
    "fr": {
        "probe": ("30 secondes", "seulement à une nouvelle sonde", "ne garantit pas le rétablissement"),
        "fallback": ("Ce chemin peut également échouer",),
        "public": ("Issue publique", "termes de reproduction non sensibles"),
        "scrub": ("retirez ou masquez", "adresses électroniques", "données personnelles ou de profil", "cookies de session", "clés d'API", "captures"),
        "filter": ("filtre", "recommandations correspondantes", "uniquement", "dans le cadre de l’identité et des fonctionnalités disponibles"),
        "block": ("ne promet pas un blocage permanent et général",),
    },
    "es": {
        "probe": ("30 segundos", "solo otra comprobación", "no una garantía de recuperación"),
        "fallback": ("La vía de respaldo también puede fallar",),
        "public": ("Issue pública", "términos de reproducción no sensibles"),
        "scrub": ("elimine o oculte", "direcciones de correo", "datos personales o de perfil", "cookies de sesión", "claves de API", "capturas"),
        "filter": ("Filtra las recomendaciones coincidentes solo dentro del alcance de la identidad y las funciones disponibles",),
        "block": ("no promete un bloqueo permanente y universal",),
    },
    "de": {
        "probe": ("30-Sekunden-Intervall", "nur ein weiterer Prüfversuch", "keine Wiederherstellungsgarantie"),
        "fallback": ("Auch der Fallback kann ausfallen",),
        "public": ("öffentlichen Issue", "nur nicht sensible Reproduktionsbegriffe"),
        "scrub": ("Entfernen oder schwärzen", "E-Mail-Adressen", "personenbezogene oder Profildaten", "Sitzungs-Cookies", "API-Schlüssel", "Screenshots"),
        "filter": ("Filtert passende Empfehlungen nur im Rahmen der verfügbaren Identität und Funktionen",),
        "block": ("verspricht keine dauerhafte, umfassende Sperre",),
    },
    "ja": {
        "probe": ("30秒", "次の確認", "復旧を保証しません"),
        "fallback": ("代替経路も失敗することがあり",),
        "public": ("公開 Issue", "機微でない再現語だけ"),
        "scrub": ("公開前に", "メールアドレス", "個人情報やプロフィール情報", "セッション Cookie", "API キー", "スクリーンショット", "削除またはマスキング"),
        "filter": ("利用可能な識別情報と機能の範囲内で一致するレコメンドのみを除外",),
        "block": ("恒久的・全面的なブロックは保証しません",),
    },
    "ko": {
        "probe": ("30초", "다음 탐색", "복구를 보장하지 않습니다"),
        "fallback": ("대체 경로도 실패할 수 있으며",),
        "public": ("공개 Issue", "민감하지 않은 재현용 검색어만"),
        "scrub": ("게시 전에", "이메일 주소", "개인 정보·프로필 정보", "세션 Cookie", "API Key", "스크린샷", "삭제하거나 가리십시오"),
        "filter": ("사용 가능한 신원·기능 범위에서 일치하는 추천만 필터링",),
        "block": ("영구적·전면 차단을 약속하지 않음",),
    },
    "pt": {
        "probe": ("30 segundos", "apenas uma nova sonda", "não uma garantia de recuperação"),
        "fallback": ("A alternativa também pode falhar",),
        "public": ("Issue pública", "termos de reprodução não sensíveis"),
        "scrub": ("remova ou oculte", "endereços de e-mail", "dados pessoais ou de perfil", "cookies de sessão", "chaves de API", "capturas"),
        "filter": ("Filtra as recomendações correspondentes apenas no âmbito da identidade e das funcionalidades disponíveis",),
        "block": ("não promete um bloqueio permanente e abrangente",),
    },
    "ru": {
        "probe": ("30-секундного", "лишь новой попыткой", "а не гарантией восстановления"),
        "fallback": ("Этот резерв тоже может отказать",),
        "public": ("публичном Issue", "только несекретные слова для воспроизведения"),
        "scrub": ("Перед публикацией удалите или замаскируйте", "адреса электронной почты", "персональные или профильные данные", "сессионные cookie", "ключи API", "снимках"),
        "filter": ("Фильтрует соответствующие рекомендации только в пределах доступной идентичности и функций",),
        "block": ("не обещает постоянную и всеобъемлющую блокировку",),
    },
}
# Separate phrases describing the search terms to scrub, also confined to the
# before-posting sentence; the public-search warning elsewhere cannot satisfy it.
SENSITIVE_SEARCH = {
    ".": "敏感搜索词", "zh-tw": "敏感搜尋詞", "en": "sensitive search terms",
    "fr": "termes de recherche sensibles", "es": "términos de búsqueda sensibles",
    "de": "sensible Suchbegriffe", "ja": "機微な検索語", "ko": "민감한 검색어",
    "pt": "termos de pesquisa sensíveis", "ru": "чувствительные поисковые слова",
}
for _locale, _phrase in SENSITIVE_SEARCH.items():
    CONCEPTS[_locale]["scrub"] += (_phrase,)
# These translations cite the architecture's resilience mechanism (3.1).
# The other four currently discuss safety/SLA without that architecture citation.
FEATURE_PROJECT_LOCALES = {".", "zh-tw", "en", "de", "pt", "ru"}
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
HEADING = re.compile(r"^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$")
IMAGE = re.compile(r"!\[[^\]\n]*\]\(([^\s)]+)(?:\s+\"[^\"]*\")?\)")
LINK = re.compile(r"(?<!!)\[[^\]\n]+\]\((/[^\s)]*)\)")
SEPARATOR_CELL = re.compile(r":?-{3,}:?")
# High-confidence encoding damage only: never single Ã/Â/â, accented words,
# arbitrary Chinese characters, or an English word such as 'TODO'.
MOJIBAKE = (
    "ï¿½", "â€™", "â€œ", "â€\x9d", "â€“", "â€”", "ÃƒÂ", "Ã¢â€", "æ–‡å­—", "锟斤拷",
    "Ã©", "Ã¨", "Ã§", "Ã¼", "Ã¶", "Ã¤", "Â\u00a0", "Â©",
)
TRANSLATOR = re.compile(
    r"^(?:(?:TODO|FIXME)(?:\(i18n\))?\s*:\s*(?:translate|locali[sz]e|翻译|翻譯)"
    r"|(?:TRANSLATOR(?: NOTE)?|I18N TODO)\s*:|(?:待翻译|待翻譯|翻译时请|翻譯時請|请将本段翻译|請將本段翻譯))",
    re.I,
)
SOURCE_OPERATIONS = {
    "安装依赖", "安装项目依赖", "启动开发服务器", "构建项目", "构建静态站点",
    "进入项目目录", "克隆仓库", "验证构建", "请执行以下命令",
}


@dataclass
class Table:
    section: str
    line: int
    rows: list


@dataclass
class Page:
    locale: str
    slug: str
    label: str
    events: list = field(default_factory=list)
    sections: dict = field(default_factory=dict)
    tables: list = field(default_factory=list)


def fail(errors, label, code, detail, line=None):
    location = f"{label}:{line}" if line else label
    errors.append(f"{location}: {code}: {detail}")


def expected_paths():
    return {Path(slug + ".md") if loc == "." else Path(loc, slug + ".md")
            for loc in SYMMETRIC_LANGS for slug in DOCS}


def check_inventory(root, errors):
    if not root.is_dir():
        fail(errors, str(root), "INVENTORY", "documentation directory is missing")
        return
    expected = {path.as_posix() for path in expected_paths()}
    # Compare spelling as strings: WindowsPath equality ignores case, but
    # routes deployed on Linux must match the exact locale/slug contract.
    actual = {p.relative_to(root).as_posix() for p in root.rglob("*")
              if p.is_file() and p.suffix.lower() in {".md", ".mdx", ".markdown", ".mdown"}}
    for path in sorted(expected - actual):
        fail(errors, path, "MISSING", "required locale/slug page")
    for path in sorted(actual - expected):
        fail(errors, path, "EXTRA", "not in the fixed 10 x 22 Markdown matrix")
    for path in sorted(root.iterdir()):
        if path.is_dir() and path.name not in LOCALES.keys() - {"root"}:
            fail(errors, path.name, "EXTRA LOCALE", "unexpected documentation directory")


def check_config(path, errors):
    """Read the bounded static Starlight locale literal, without executing JS."""
    try:
        text = path.read_text(encoding="utf-8", errors="strict")
    except (OSError, UnicodeError) as exc:
        fail(errors, path.name, "LOCALES", str(exc))
        return
    start = re.search(r"^\s*locales\s*:\s*\{", text, re.M)
    if not start:
        fail(errors, path.name, "LOCALES", "missing static locales object")
        return
    depth, quote, comment, end = 1, None, None, None
    i = start.end()
    while i < len(text):
        char = text[i]
        pair = text[i:i + 2]
        if comment:
            if comment == "//" and char == "\n":
                comment = None
            elif comment == "/*" and pair == "*/":
                comment = None
                i += 1
        elif quote:
            if char == "\\":
                i += 1
            elif char == quote:
                quote = None
        elif pair in {"//", "/*"}:
            comment = pair
            i += 1
        elif char in "\"'`":
            quote = char
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if not depth:
                end = i
                break
        i += 1
    if end is None:
        fail(errors, path.name, "LOCALES", "unclosed locales object")
        return
    block = text[start.end():end]
    entry = re.compile(r"(?:'([^']+)'|\"([^\"]+)\"|([\w-]+))\s*:\s*\{([^{}]*)\}")
    locales = {}
    for match in entry.finditer(block):
        key = next(value for value in match.groups()[:3] if value is not None)
        lang = re.findall(r"\blang\s*:\s*['\"]([^'\"]+)['\"]", match[4])
        if key in locales or len(lang) != 1:
            fail(errors, path.name, "LOCALES", f"duplicate locale or invalid lang: {key}")
        locales[key] = lang[0] if len(lang) == 1 else None
    remainder = entry.sub("", block)
    remainder = re.sub(r"/\*.*?\*/|//[^\n]*", "", remainder, flags=re.S)
    default = re.findall(r"^\s*defaultLocale\s*:\s*['\"]([^'\"]+)['\"]", text, re.M)
    if remainder.strip(" \t\r\n,") or locales != LOCALES or default != ["root"]:
        fail(errors, path.name, "LOCALES", f"expected default=root and {LOCALES}; found {locales}, default={default}")


def yaml_string(value, following):
    """Read required YAML string scalars; Astro separately validates full YAML."""
    value = value.strip()
    if re.fullmatch(r"[|>][+-]?[1-9]?", value):
        return " ".join(line.strip() for line in following if line.strip())
    if value.startswith('"'):
        try:
            result, end = json.JSONDecoder().raw_decode(value)
            rest = value[end:].strip()
            return result if isinstance(result, str) and (not rest or rest.startswith("#")) else ""
        except ValueError:
            return ""
    if value.startswith("'"):
        match = re.fullmatch(r"'((?:[^']|'')*)'\s*(?:#.*)?", value)
        return match[1].replace("''", "'") if match else ""
    value = re.split(r"\s+#", value, maxsplit=1)[0].strip()
    if not value or value.startswith(("#", "[", "{", "!", "&", "*")):
        return ""
    if value.casefold() in {"null", "~", "true", "false"} or re.fullmatch(r"[-+]?\d+(?:\.\d+)?", value):
        return ""
    return value


def frontmatter(lines, label, errors):
    if not lines or lines[0] != "---":
        fail(errors, label, "FRONTMATTER", "must start with ---")
        return 0
    end = next((i for i in range(1, len(lines)) if lines[i] == "---"), None)
    if end is None:
        fail(errors, label, "FRONTMATTER", "missing closing ---")
        return len(lines)
    for key in ("title", "description"):
        fields = [(i, re.fullmatch(rf"{key}:[ \t]*(.*)", lines[i])) for i in range(1, end)]
        fields = [(i, match) for i, match in fields if match]
        if len(fields) != 1:
            fail(errors, label, "FRONTMATTER", f"requires exactly one non-empty {key}")
            continue
        i, match = fields[0]
        stop = i + 1
        while stop < end and (not lines[stop].strip() or lines[stop].startswith((" ", "\t"))):
            stop += 1
        if not yaml_string(match[1], lines[i + 1:stop]).strip():
            fail(errors, label, "FRONTMATTER", f"{key} must be a non-empty string", i + 1)
    return end + 1


def check_metadata(lines, start, page, errors):
    i = next((i for i in range(start, len(lines)) if lines[i].strip()), None)
    raw = lines[i].strip() if i is not None else ""
    match = re.fullmatch(r"\*\*(.+)\*\*", raw)
    parts = re.split(r"[｜|]", match[1]) if match else []
    if len(parts) != 2:
        fail(errors, page.label, "REVISION", "first body block must declare revision date and version", (i + 1) if i is not None else None)
        return
    date_label, date, version_label = METADATA[page.locale]
    date_pattern = rf"(?:{date_label})\s*[:：]?\s*(?:{REVISION}|{date})"
    if not re.fullmatch(date_pattern, parts[0].strip(), re.I):
        fail(errors, page.label, "REVISION", f"expected {REVISION} in the localized revision declaration", i + 1)
    if not re.fullmatch(rf"{version_label}\s*[:：]?\s*{re.escape(VERSION)}", parts[1].strip(), re.I):
        fail(errors, page.label, "VERSION", f"expected {VERSION}", i + 1)


def check_damage(text, page, errors):
    fence = None
    for number, line in enumerate(text.splitlines(), 1):
        marker = FENCE.fullmatch(line)
        in_code = fence is not None
        if marker:
            if fence is None:
                fence = (marker[1][0], len(marker[1]))
            elif marker[1][0] == fence[0] and len(marker[1]) >= fence[1] and not marker[2].strip():
                fence = None
        if "\ufffd" in line or any(token in line for token in MOJIBAKE):
            fail(errors, page.label, "ENCODING", "replacement character or known mojibake sequence", number)
        if any(ord(char) < 32 and char != "\t" for char in line):
            fail(errors, page.label, "ENCODING", "unexpected control character", number)
        # A bare ======= is valid Markdown (a setext heading), not evidence of
        # a merge conflict. Git's opening/base/closing markers are sufficient.
        if re.fullmatch(r"(?:<{7}|>{7}|\|{7})(?: .*)?", line):
            fail(errors, page.label, "CONFLICT", "unresolved Git conflict marker", number)
        comment = re.fullmatch(r"\s*(?:#|//)\s*(.*?)\s*", line)
        candidate = comment[1] if comment else line.strip()
        if TRANSLATOR.match(candidate):
            fail(errors, page.label, "TRANSLATION NOTE", "unpublished translator instruction", number)
        if in_code and comment and page.locale not in {".", "zh-tw"} and candidate.rstrip("。；;：:") in SOURCE_OPERATIONS:
            fail(errors, page.label, "TRANSLATION NOTE", "untranslated source-language operation comment", number)
    for comment in re.finditer(r"<!--(.*?)-->", text, re.S):
        for line in comment[1].splitlines():
            if TRANSLATOR.match(line.strip()):
                number = text.count("\n", 0, comment.start()) + 1
                fail(errors, page.label, "TRANSLATION NOTE", "unpublished HTML translator instruction", number)


def row_cells(line):
    """GFM pipes must be escaped even inside a code span. Honor backslash parity."""
    text = line.strip()
    cells, cell, pipes = [], [], 0
    i = 0
    while i < len(text):
        char = text[i]
        if char == "\\" and i + 1 < len(text):
            cell.extend(text[i:i + 2])
            i += 2
            continue
        if char == "|":
            cells.append("".join(cell).strip())
            cell = []
            pipes += 1
        else:
            cell.append(char)
        i += 1
    cells.append("".join(cell).strip())
    if not pipes:
        return None
    if text.startswith("|"):
        cells.pop(0)
    if cells and not cells[-1] and text.endswith("|"):
        cells.pop()
    return cells


def is_separator(cells):
    return bool(cells) and all(SEPARATOR_CELL.fullmatch(cell) for cell in cells)


def markdown_lines(lines, start, page, errors):
    """Hide HTML comments only outside fences; preserve one entry per line."""
    result = [""] * start
    comment, fence = None, None
    for number in range(start, len(lines)):
        line = lines[number]
        marker = FENCE.fullmatch(line)
        if fence:
            if marker and marker[1][0] == fence[0] and len(marker[1]) >= fence[1] and not marker[2].strip():
                fence = None
            result.append(line)
            continue
        if comment is None and marker:
            fence = (marker[1][0], len(marker[1]))
            result.append(line)
            continue
        visible, pos = [], 0
        while pos < len(line):
            if comment is not None:
                end = line.find("-->", pos)
                if end < 0:
                    break
                comment, pos = None, end + 3
            else:
                opening = line.find("<!--", pos)
                if opening < 0:
                    visible.append(line[pos:])
                    break
                visible.append(line[pos:opening])
                comment, pos = number + 1, opening + 4
        result.append("".join(visible))
    if comment is not None:
        fail(errors, page.label, "COMMENT", "unclosed HTML comment", comment)
    return result


def scan_markdown(lines, start, page, errors):
    lines = markdown_lines(lines, start, page, errors)
    fence, notes, section = None, [], ""
    i = start
    while i < len(lines):
        line = lines[i]
        marker = FENCE.fullmatch(line)
        if fence:
            char, width, opened = fence
            if marker and marker[1][0] == char and len(marker[1]) >= width and not marker[2].strip():
                fence = None
            i += 1
            continue
        if marker:
            if marker[1][0] == "`" and "`" in marker[2]:
                fail(errors, page.label, "FENCE", "backticks in opening fence info", i + 1)
            fence = (marker[1][0], len(marker[1]), i + 1)
            info = marker[2].strip().split()
            page.events.append(("fence", info[0] if info else ""))
            i += 1
            continue
        heading = HEADING.fullmatch(line)
        if heading:
            number = re.match(r"(\d+(?:\.\d+)*)(?:\.\s+|\s+|$)", heading[2])
            section = number[1] if number else ""
            if section and section in page.sections:
                fail(errors, page.label, "HEADINGS", f"duplicate section {section}", i + 1)
            page.sections.setdefault(section, [])
            page.events.append(("heading", len(heading[1]), section))
        elif line.lstrip().startswith(":::"):
            opening = re.fullmatch(r" {0,3}(:{3,})(note|tip|caution|danger)(?:\[[^\]]*\])?\s*", line)
            closing = re.fullmatch(r" {0,3}(:{3,})\s*", line)
            if opening:
                notes.append((len(opening[1]), i + 1))
                page.events.append(("note-open", opening[2]))
            elif closing and notes and len(closing[1]) >= notes[-1][0]:
                notes.pop()
                page.events.append(("note-close",))
            else:
                fail(errors, page.label, "DIRECTIVE", "malformed or unmatched admonition delimiter", i + 1)
        else:
            cells = row_cells(line)
            next_cells = row_cells(lines[i + 1]) if i + 1 < len(lines) else None
            if cells is not None and (line.lstrip().startswith("|") or is_separator(next_cells)):
                rows, opened = [], i + 1
                while i < len(lines) and (cells := row_cells(lines[i])) is not None:
                    rows.append(cells)
                    page.sections.setdefault(section, []).append(lines[i])
                    i += 1
                if len(rows) < 2 or not is_separator(rows[1]) or is_separator(rows[0]):
                    fail(errors, page.label, "TABLE", "requires a header followed by a separator row", opened)
                width = len(rows[0])
                for offset, row in enumerate(rows):
                    if len(row) != width:
                        fail(errors, page.label, "TABLE", f"row has {len(row)} columns; header has {width}", opened + offset)
                page.tables.append(Table(section, opened, rows))
                page.events.append(("table", max(0, len(rows) - 2), width))
                continue
            for image in IMAGE.finditer(line):
                page.events.append(("figure", image[1]))
        if not heading:
            page.sections.setdefault(section, []).append(line)
        i += 1
    if fence:
        fail(errors, page.label, "FENCE", "unclosed code fence", fence[2])
    for _, opened in notes:
        fail(errors, page.label, "DIRECTIVE", "unclosed admonition", opened)
    if not any(event[0] == "heading" for event in page.events):
        fail(errors, page.label, "HEADINGS", "no content headings")


def normalized(text):
    return " ".join(text.replace("’", "'").split()).casefold()


def contains_all(text, fragments):
    text = normalized(text)
    return all(normalized(fragment) in text for fragment in fragments)


def sentences(text):
    return re.split(r"[。；;!?！？]|\.(?=\s|$)", text)


def hrefs(text):
    return [match[1] for match in LINK.finditer(text)]


def target(href, locale, slug):
    prefix = "" if locale == "." else locale + "/"
    path = re.split(r"[?#]", href, maxsplit=1)[0]
    return path in {f"/{prefix}{slug}/", f"/sonic/{prefix}{slug}/"}


def check_concepts(page, errors):
    vocab = CONCEPTS[page.locale]

    def require(condition, detail):
        if not condition:
            fail(errors, page.label, "CONCEPT", detail)

    def section(number):
        return "\n".join(page.sections.get(number, []))

    if page.slug == "troubleshooting":
        degraded, reporting = section("2"), section("7")
        for key in ("probe", "fallback"):
            require(any(contains_all(sentence, vocab[key]) for sentence in sentences(degraded)),
                    f"section 2 missing reviewed {key} limitation")
        require(contains_all(reporting, vocab["public"]), "section 7 must restrict public Issues to non-sensitive reproduction terms")
        require(any(contains_all(sentence, vocab["scrub"]) for sentence in sentences(reporting)),
                "section 7 must instruct scrubbing credentials, PII and screenshots before posting")
        require("privacy@epocanvas.com" in reporting, "section 7 must provide the privacy contact")
    elif page.slug == "search-syntax":
        tables = [table for table in page.tables if table.section == "2"]
        rows = tables[0].rows if tables else []
        require(len(rows) >= 4 and len(rows[2]) >= 3 and
                all(name in rows[2][2] for name in ("周杰伦", "周傑倫")),
                "section 2 glyph example must contain distinct 周杰伦 / 周傑倫 spellings")
        require(len(rows) >= 4 and len(rows[3]) >= 3 and
                re.search(r"(?<![A-Za-z0-9_])zjl(?![A-Za-z0-9_])", rows[3][2]) is not None,
                "section 2 pinyin example must use the exact initials zjl")
    elif page.slug == "recommendation":
        for number in ("1", "6"):
            rows = [row for table in page.tables if table.section == number for row in table.rows[2:]
                    if any(re.search(r"\bdislike\b", cell, re.I) for cell in row[:2])]
            require(len(rows) == 1, f"section {number} must have one identifiable dislike row")
            for row in rows:
                require(len(row) >= 3 and contains_all(row[2], vocab["filter"] + vocab["block"]),
                        f"section {number} dislike effect must be a scoped filter without a permanent-block promise")
    elif page.slug == "interface":
        # The fourth playback-control action is the IndexedDB download entry.
        actions = [line for line in page.sections.get("5", []) if re.match(r"4\.\s", line)]
        require(len(actions) == 1 and "IndexedDB" in actions[0] and
                any(target(href, page.locale, "library") for href in hrefs(actions[0])),
                "section 5 download action must link to this locale's library page")
    elif page.slug == "features":
        resilience = section("8")
        if page.locale in FEATURE_PROJECT_LOCALES or re.search(r"(?<!\d)3\.1(?!\d)", resilience):
            require(any(target(href, page.locale, "project") for href in hrefs(resilience)),
                    "section 8 architecture/resilience reference must link to this locale's project page")


def check_page(text, locale, slug, errors):
    label = f"{slug}.md" if locale == "." else f"{locale}/{slug}.md"
    page = Page(locale, slug, label)
    lines = text.splitlines()
    check_damage(text, page, errors)
    start = frontmatter(lines, label, errors)
    check_metadata(lines, start, page, errors)
    scan_markdown(lines, start, page, errors)
    check_concepts(page, errors)
    return page


def read_utf8(path, label, errors):
    try:
        return path.read_text(encoding="utf-8", errors="strict")
    except (OSError, UnicodeError) as exc:
        fail(errors, label, "UTF-8/READ", str(exc))
        return None


def compare(base, page, errors):
    if page.events != base.events:
        index = next((i for i, pair in enumerate(zip(base.events, page.events)) if pair[0] != pair[1]),
                     min(len(base.events), len(page.events)))
        expected = base.events[index:index + 1]
        actual = page.events[index:index + 1]
        fail(errors, page.label, "STRUCTURE", f"block {index + 1}: {actual} != base {expected} "
             "(heading levels/numbers, table dimensions, ordered figures, fences and admonitions)")


def validate(root=ROOT, config=CONFIG):
    errors, pages = [], {}
    check_config(config, errors)
    check_inventory(root, errors)
    for locale in SYMMETRIC_LANGS:
        for slug in DOCS:
            relative = Path(slug + ".md") if locale == "." else Path(locale, slug + ".md")
            path = root / relative
            if not path.is_file():
                continue  # Already diagnosed by the exact inventory check.
            text = read_utf8(path, relative.as_posix(), errors)
            if text is not None:
                pages[locale, slug] = check_page(text, locale, slug, errors)
    for slug in DOCS:
        base = pages.get((".", slug))
        if base:
            for locale in SYMMETRIC_LANGS[1:]:
                page = pages.get((locale, slug))
                if page:
                    compare(base, page, errors)
    return errors


def self_test():
    """Mutation checks stay in memory or TemporaryDirectory; never edit docs."""
    count = 0

    def expect(errors, code=None):
        nonlocal count
        count += 1
        if code is None:
            assert not errors, "unexpected failure: " + "; ".join(errors)
        else:
            assert any(f": {code}:" in error for error in errors), f"expected {code}, got {errors}"

    def source(locale, slug):
        return (ROOT / locale / (slug + ".md")).read_text(encoding="utf-8")

    def edited(text, old, new):
        assert old in text, f"self-test fixture no longer contains {old!r}"
        return text.replace(old, new, 1)

    def test_page(text, code=None, locale="en", slug="overview"):
        errors = []
        page = check_page(text, locale, slug, errors)
        expect(errors, code)
        return page

    overview = source("en", "overview")
    title = next(line for line in overview.splitlines() if line.startswith("title:"))
    for old, new in [
        (title, "title: ''"),
        (title, 'title: "   "'),
        (title, "title: null"),
        (title, "title: # comment only"),
        (title, "title: |\n  \n"),
        (title, title + "\ntitle: Duplicate"),
        (title, "other: Overview"),
    ]:
        test_page(edited(overview, old, new), "FRONTMATTER")
    test_page(re.sub(r"^description:.*$", "description: []", overview, flags=re.M), "FRONTMATTER")
    test_page(overview.replace("---", "--", 1), "FRONTMATTER")
    test_page(edited(overview, title, 'title: "Overview: notes" # comment'))
    test_page(edited(overview, title, "title: >-\n  Overview\n  details"))
    test_page(edited(overview, "Version: 1.8", "Version: 1.80"), "VERSION")
    test_page(edited(overview, "Version: 1.8", "Version: 1.7"), "VERSION")

    # Localized and ISO date acceptance, and rejection despite later provenance.
    for locale in SYMMETRIC_LANGS:
        text = source(locale, "overview")
        date = re.compile(METADATA[locale][1])
        test_page(date.sub(REVISION, text, count=1), locale=locale)
        first = next(line for line in text.splitlines() if line.startswith("**"))
        test_page(edited(text, first, first.replace("2026", "2025")), "REVISION", locale)

    for value, code in [
        ("\ufffd", "ENCODING"), ("cafÃ©", "ENCODING"), ("â€™", "ENCODING"),
        ("锟斤拷", "ENCODING"), ("bad\x00text", "ENCODING"),
        ("<<<<<<< HEAD", "CONFLICT"), (">>>>>>> branch", "CONFLICT"),
        ("||||||| base", "CONFLICT"), ("TODO: translate this section", "TRANSLATION NOTE"),
        ("<!--\nTRANSLATOR NOTE: replace this\n-->", "TRANSLATION NOTE"),
        ("```bash\n# 安装依赖\npnpm install\n```", "TRANSLATION NOTE"),
        ("<!-- unclosed", "COMMENT"),
    ]:
        test_page(overview + "\n" + value + "\n", code)
    test_page(overview + "\nCafé, Français, São, Über, Âge, ângulo, Ã and русский.\n"
              "The TODO API key is a literal identifier, not an instruction.\n"
              "The text 'only English' is not encoding damage.\n"
              "Heading\n=======\n<!-- ordinary editorial note -->\n"
              "```bash\n# Install dependencies\npnpm install\n```\n")

    for table in [
        "| A | B |\n", "| A | B |\n| value | other |\n",
        "| A | B |\n| --- |\n| one | two |\n",
        "| A | B |\n| --- | --- |\n| one |\n",
        "| --- | --- |\n| --- | --- |\n",
    ]:
        test_page(overview + "\n" + table, "TABLE")
    for table in [
        "| A | B |\n| :--- | ---: |\n| a\\|b | `c\\|d` |\n",
        "A | B\n--- | ---\none | two\n",  # GFM outer pipes are optional.
        "| A | B |\n| --- | --- |\n",  # Header-only tables are valid.
    ]:
        test_page(overview + "\n" + table)
    assert row_cells(r"| a\\|b | c |") == [r"a\\", "b", "c"]
    assert row_cells(r"| a\|b | c |") == [r"a\|b", "c"]
    for sample, code in [
        ("```bash\npnpm install\n", "FENCE"),
        ("```bash\npnpm install\n~~~\n", "FENCE"),
        ("````bash\npnpm install\n```\n", "FENCE"),
        (":::caution[Test]\nText\n", "DIRECTIVE"),
        (":::tip[Test]\nText\n::::note[Test]\nText\n::::\n", "DIRECTIVE"),
        (":::\n", "DIRECTIVE"),
    ]:
        test_page(overview + "\n" + sample, code)
    for sample in [
        "````text\n```\n## fake heading\n| not a table |\n:::tip\n`````\n",
        "~~~text\n```\n## fake heading\n~~~~\n",
        ":::tip[Test]\n````text\n:::\n````\n:::\n",
        "```html\n<!-- a literal unclosed comment\n```\n",
        "<!--\n## hidden heading\n| not a table |\n-->\n",
        "# 安装依赖\n",  # A heading, not an untranslated shell comment.
    ]:
        test_page(overview + "\n" + sample)

    # Every locale is tested; deleting a limiting phrase must not be masked by
    # another section, a comment, a code example or unrelated positive wording.
    for locale in SYMMETRIC_LANGS:
        vocab = CONCEPTS[locale]
        text = source(locale, "troubleshooting")
        for key in ("probe", "fallback", "public", "scrub"):
            start = text.index("## 2.") if key in {"probe", "fallback"} else text.index("## 7.")
            stop = text.index("## 3.") if key in {"probe", "fallback"} else len(text)
            for phrase in vocab[key]:
                assert phrase in text[start:stop], (locale, key, phrase)
                mutated = text[:start] + text[start:stop].replace(phrase, "[removed]") + text[stop:]
                test_page(mutated, "CONCEPT", locale, "troubleshooting")
        index = text.index("## 7.")
        test_page(text[:index] + edited(text[index:], "privacy@epocanvas.com", "admin@epocanvas.com"),
                  "CONCEPT", locale, "troubleshooting")
        phrase = vocab["probe"][-1]
        start, stop = text.index("## 2."), text.index("## 3.")
        hidden = f"\n<!-- {phrase} -->\n```text\n{phrase}\n```\n"
        mutated = text[:start] + edited(text[start:stop], phrase, "[removed]") + hidden + text[stop:]
        test_page(mutated, "CONCEPT", locale, "troubleshooting")
        text = source(locale, "recommendation")
        for key in ("filter", "block"):
            for phrase in vocab[key]:
                test_page(edited(text, phrase, "[removed]"), "CONCEPT", locale, "recommendation")
        text = source(locale, "search-syntax")
        for old, new in [("zjl", "jay"), ("周傑倫", "周杰伦")]:
            test_page(edited(text, old, new), "CONCEPT", locale, "search-syntax")
        text = source(locale, "interface")
        prefix = "" if locale == "." else locale + "/"
        test_page(edited(text, f"/{prefix}library/", f"/{prefix}data-management/"), "CONCEPT", locale, "interface")
        if locale != ".":
            test_page(edited(text, f"/{prefix}library/", "/library/"), "CONCEPT", locale, "interface")
        text = source(locale, "features")
        if locale in FEATURE_PROJECT_LOCALES:
            index = text.index("## 8.")
            mutated = text[:index] + edited(text[index:], f"/{prefix}project/", f"/{prefix}data-security/")
            test_page(mutated, "CONCEPT", locale, "features")
        else:
            test_page(text, locale=locale, slug="features")

    base = test_page(overview)
    for old, new in [("## 1.", "### 1."), ("## 1.", "## 99.")]:
        page = test_page(edited(overview, old, new))
        errors = []
        compare(base, page, errors)
        expect(errors, "STRUCTURE")
    for suffix in ["\n![Extra figure](/images/extra.svg)\n", "\n:::tip\nExtra\n:::\n",
                   "\n```text\nexample\n```\n", "\n| A | B |\n| --- | --- |\n"]:
        errors = []
        compare(base, test_page(overview + suffix), errors)
        expect(errors, "STRUCTURE")

    # Filesystem mutations only touch a disposable temporary directory.
    with tempfile.TemporaryDirectory(prefix="sonic-content-integrity-") as temp:
        root = Path(temp) / "docs"
        root.mkdir()
        for relative in expected_paths():
            path = root / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.touch()
        errors = []
        check_inventory(root, errors)
        expect(errors)
        for relative in [Path("extra.md"), Path("en/extra.mdx"), Path("en/extra.MD"),
                         Path("en/extra.markdown"), Path("en/nested/overview.md")]:
            path = root / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.touch()
            errors = []
            check_inventory(root, errors)
            expect(errors, "EXTRA")
            path.unlink()
        unknown = root / "it"
        unknown.mkdir()
        errors = []
        check_inventory(root, errors)
        expect(errors, "EXTRA LOCALE")
        unknown.rmdir()
        missing = root / "en/overview.md"
        missing.unlink()
        wrong_case = root / "en/Overview.MD"
        wrong_case.touch()
        errors = []
        check_inventory(root, errors)
        expect(errors, "EXTRA")
        expect(errors, "MISSING")
        wrong_case.unlink()
        errors = []
        check_inventory(root, errors)
        expect(errors, "MISSING")
        for path in (root / "ru").glob("*.md"):
            path.unlink()
        (root / "ru").rmdir()
        errors = []
        check_inventory(root, errors)
        expect(errors, "MISSING")
        assert sum(": MISSING:" in error for error in errors) == 23
        missing.write_bytes(b"invalid \xff UTF-8")
        errors = []
        assert read_utf8(missing, "en/overview.md", errors) is None
        expect(errors, "UTF-8/READ")
        config = CONFIG.read_text(encoding="utf-8")
        config_path = Path(temp) / "astro.config.mjs"
        for old, new in [
            ("defaultLocale: 'root'", "defaultLocale: 'en'"),
            ("ru: { label: 'Русский', lang: 'ru' },", ""),
            ("locales: {", "locales: {\n it: {label: 'Italiano', lang: 'it'},"),
            ("lang: 'zh-CN'", "lang: 'zh-TW'"),
        ]:
            config_path.write_text(edited(config, old, new), encoding="utf-8")
            errors = []
            check_config(config_path, errors)
            expect(errors, "LOCALES")
    print(f"OK: {count} self-test checks (mutations and valid edge cases); repository content untouched")
    return 0


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true", help="exercise the checker against temporary/in-memory mutations")
    args = parser.parse_args()
    errors = validate()
    for error in errors:
        print(error)
    if errors:
        print(f"FAILED: {len(errors)} content integrity errors")
        return 1
    print(f"OK: {len(LOCALES)} locales x {len(DOCS)} slugs = {len(expected_paths())} pages; "
          f"UTF-8, metadata ({REVISION}, v{VERSION}), Markdown, structure and reviewed concepts")
    if args.self_test:
        return self_test()
    return 0


if __name__ == "__main__":
    sys.exit(main())
