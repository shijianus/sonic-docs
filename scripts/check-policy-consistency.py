# -*- coding: utf-8 -*-
"""Check citation syntax and literal consistency across the policy translations.

Numbered article references are checked against the repository's GDPR-only
whitelist, including references which omit the regulation's name. This is not
regulation identity verification, legal review, or an applicability assessment.
"""
import argparse
import re
import sys
from collections import Counter
from pathlib import Path
from typing import NamedTuple

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "src" / "content" / "docs"
LOCALES = [".", "zh-tw", "en", "fr", "es", "de", "ja", "ko", "pt", "ru"]
POLICIES = ["terms-of-service", "privacy-policy"]
VERSION = re.compile(
    r"(?:版本|Version|Versión|バージョン|버전|Versão|Версия)\s*[：:]?\s*(\d+\.\d+)",
    re.I,
)
# Full article words in the six Latin/Cyrillic locales; 第 covers zh/zh-tw/ja.
# Russian includes singular/plural cases and both instrumental spellings (е/ё).
ARTICLE_MARKER = re.compile(
    r"(?P<cjk>第)(?=\s*\d)|(?P<ko>제)(?=\s*\d)|"
    r"(?<!\w)(?:(?P<word>articles?|artikel[ns]?|art[ií]culos?|artigos?|"
    r"стат(?:ья|ьи|ье|ью|ьей|ьею|ьёй|ьёю|ей|ьям|ьями|ьях))(?!\w)|"
    r"(?P<abbreviation>arts?\.(?:\s*arts?\.)?|artt\.|ст\.(?:\s*ст\.)?|arts?(?!\w)))",
    re.I,
)
# A soft line wrap is allowed, but not a blank paragraph between list items.
SPACE = re.compile(r"[^\S\n]*(?:\n(?![^\S\n]*\n)[^\S\n]*)?")
DIGITS = re.compile(r"\d+")
ORDINAL = re.compile(r"\.[º°]|[º°]")
UNITS = {"cjk": re.compile(r"[条條]"), "ko": re.compile(r"조")}
CONJUNCTION = r"(?:\b(?:and|et|y|und|e|и)\b|以及|及び|および|並びに|和|及|与|與|や|と|및|와|과|&)"
LIST_SEPARATOR = re.compile(
    r"(?:[,，、](?:" + SPACE.pattern + CONJUNCTION + r")?|" + CONJUNCTION + r")", re.I
)
RANGE_SEPARATOR = re.compile(
    r"(?:[-‐‑‒–—−~〜～]|\b(?:to|through|bis|à|au|a|até|hasta|al|до|по)\b|至|到|から|乃至|부터|내지)",
    re.I,
)
# Only compact subreferences, not explanatory parentheses such as '(GDPR)'.
SHORTHAND = re.compile(r"[^\S\n]*(?:[,，][^\S\n]*)?[（(]\s*(?:\d+|[a-zа-я])\s*[)）]", re.I)
INLINE_CODE = re.compile(r"(`+)(?!`).*?(?<!`)\1(?!`)", re.S)
HTML_COMMENT = re.compile(r"<!--.*?(?:-->|\Z)", re.S)
MAX_RANGE_SPAN = 10000  # Reject, never silently truncate, pathological ranges.
PROBLEM_MESSAGES = {
    "abbreviation": "prohibited article abbreviation; use the full article word",
    "shorthand": "prohibited parenthetical article shorthand; spell out paragraph/point units",
    "descending-range": "descending article range; use ascending endpoints",
    "oversize-range": "article range too large to enumerate; citation rejected",
}
PROVENANCE = ["2026-11-02", "2026-10-27", "2026-11-01", "ce443c8", "a75f5cb", "rc/sonic-20261031"]
CORRUPT_TEXT = ["公开 main 提交 的", "公開公開 main", "公開検索公開 main", "공개 공개 main", "публичный коммит mainа"]
STALE_DISCLOSURES = [
    "文件主体与内嵌封面留在", "文件主体及内嵌封面留在",
    "檔案主體與內嵌封面留在", "檔案主體及內嵌封面留在",
    "file contents and embedded artwork stay on the device",
    "file contents and embedded artwork remain on the device",
    "file contents and embedded artwork stay locally",
    "the email addresses appear in the existing repository",
    "these are the repository's existing contact channels",
]


class Citation(NamedTuple):
    start: int
    end: int
    numbers: tuple
    problems: tuple


def _blank(text):
    """Mask non-prose while preserving offsets and diagnostic line numbers."""
    return re.sub(r"[^\n]", " ", text)


def _mask_code(text):
    lines = []
    fence = None
    for line in text.splitlines(keepends=True):
        marker = re.match(r"^[ \t]{0,3}(`{3,}|~{3,})(.*)$", line.rstrip("\r\n"))
        if fence:
            lines.append(_blank(line))
            if (marker and marker[1][0] == fence[0] and len(marker[1]) >= len(fence)
                    and not marker[2].strip()):
                fence = None
        elif marker:
            fence = marker[1]
            lines.append(_blank(line))
        else:
            lines.append(line)
    text = "".join(lines)
    text = HTML_COMMENT.sub(lambda match: _blank(match[0]), text)
    return INLINE_CODE.sub(lambda match: _blank(match[0]), text)


def _style(marker):
    return marker.lastgroup if marker.lastgroup in UNITS else "word"


def _read_item(text, position, style):
    """Read one article number, not a paragraph, version, or section number."""
    position = SPACE.match(text, position).end()
    problems = []
    repeated = ARTICLE_MARKER.match(text, position)
    if repeated:
        if _style(repeated) != style:
            return None
        if repeated.lastgroup == "abbreviation":
            problems.append("abbreviation")
        position = SPACE.match(text, repeated.end()).end()
    number = DIGITS.match(text, position)
    if not number:
        return None
    end = number.end()
    if style == "word":
        ordinal = ORDINAL.match(text, end)
        if ordinal:
            end = ordinal.end()
        # Do not turn e.g. Article 1.8, identifiers or regulation 2016/679 into 1/2016.
        if re.match(r"\w|[./]\d", text[end:]):
            return None

    # CJK/Korean units can be shared by a list (第5、6条), or repeated per item.
    has_unit = style == "word"
    while True:
        shorthand = SHORTHAND.match(text, end)
        if shorthand:
            problems.append("shorthand")
            end = shorthand.end()
            continue
        if not has_unit:
            unit = UNITS[style].match(text, SPACE.match(text, end).end())
            if unit:
                has_unit = True
                end = unit.end()
                continue
        break
    return int(number[0]), end, has_unit, problems


def _read_citation(text, marker):
    style = _style(marker)
    item = _read_item(text, marker.end(), style)
    if item is None:
        return None
    items = [(None, item)]
    accepted = len(items) if item[2] else 0
    end = item[1]
    while True:
        position = SPACE.match(text, end).end()
        separator = RANGE_SEPARATOR.match(text, position)
        kind = "range"
        if not separator:
            separator = LIST_SEPARATOR.match(text, position)
            kind = "list"
        if not separator:
            break
        item = _read_item(text, separator.end(), style)
        if item is None:
            # In particular, a comma before 'Paragraph 1' does NOT introduce Article 1.
            break
        items.append((kind, item))
        end = item[1]
        if item[2]:
            accepted = len(items)
    if not accepted:
        return None  # 第5、6节 / 第5項 / 제5항 are not article references.

    numbers = []
    problems = ["abbreviation"] if marker.lastgroup == "abbreviation" else []
    for kind, (number, end, _, item_problems) in items[:accepted]:
        problems.extend(item_problems)
        if kind == "range":
            previous = numbers[-1]
            if number < previous:
                problems.append("descending-range")
            if abs(number - previous) > MAX_RANGE_SPAN:
                problems.append("oversize-range")
                numbers.append(number)
            else:
                step = 1 if number >= previous else -1
                numbers.extend(range(previous + step, number + step, step))
        else:
            numbers.append(number)
    return Citation(marker.start(), end, tuple(numbers), tuple(dict.fromkeys(problems)))


def extract_citations(text):
    """Identify article syntax in all ten locales, without authenticating a law."""
    prose = _mask_code(text)
    citations = []
    consumed = 0
    for marker in ARTICLE_MARKER.finditer(prose):
        if marker.start() < consumed:
            continue
        citation = _read_citation(prose, marker)
        if citation:
            citations.append(citation)
            consumed = citation.end
    return citations


def validate_citations(text, allowed):
    """Check every identified reference; missing GDPR wording is not an exemption."""
    allowed = {int(number) for number in allowed}
    issues = []
    count = 0
    for citation in extract_citations(text):
        line = text.count("\n", 0, citation.start) + 1
        count += len(citation.numbers)
        excerpt = " ".join(text[citation.start:citation.end].split())
        for problem in citation.problems:
            issues.append(f"{line}: {PROBLEM_MESSAGES[problem]}: {excerpt!r}")
        for number in dict.fromkeys(citation.numbers):
            if number not in allowed:
                issues.append(f"{line}: unlisted article {number} (GDPR whitelist): {excerpt!r}")
    return issues, count


def self_test():
    """Run isolated positive/negative unit cases; no document edits or site build."""
    import unittest

    allowed = {4, 5, 6, 7, 35, 37}
    cases = []

    def case(name, text, numbers, problems=()):
        cases.append((name, text, tuple(numbers), set(problems)))

    # Canonical citations from doc/legal-reference.md, including paragraph/point units.
    canonical = [
        ("zh", "GDPR 第 6 条第 1 项第 a 款"),
        ("zh_tw", "GDPR 第 6 條第 1 項第 a 款"),
        ("en", "Article 6, Paragraph 1, point (a)"),
        ("fr", "l'article 6, paragraphe 1, point a) du RGPD"),
        ("es", "el artículo 6, apartado 1, letra a) del RGPD"),
        ("de", "Artikel 6 Absatz 1 Buchstabe a der DSGVO"),
        ("ja", "GDPR 第6条第1項第a号"),
        ("ko", "GDPR 제6조 제1항 a호"),
        ("pt", "o artigo 6.º, n.º 1, alínea a) do RGPD"),
        ("ru", "статья 6, пункт 1, подпункт «a» GDPR"),
    ]
    for locale, text in canonical:
        case(f"canonical_{locale}", text, [6])
        case(f"unlisted_{locale}", text.replace("6", "99", 1), [99])
        case(f"paragraph_not_article_{locale}", text.replace("1", "99", 1), [6])

    for word, conjunction in [
        ("Articles", "and"), ("articles", "et"), ("artículos", "y"),
        ("Artikel", "und"), ("artigos", "e"), ("статей", "и"),
    ]:
        case(f"list_{conjunction}", f"{word} 5, 6 {conjunction} 99", [5, 6, 99])
        case(f"oxford_comma_{conjunction}", f"{word} 5, 6, {conjunction} 99", [5, 6, 99])
        case(f"range_then_list_{conjunction}", f"{word} 5–7 {conjunction} 99", [5, 6, 7, 99])
    case("requested_russian_list", "статей 37, 35 и 99", [37, 35, 99])
    case("plain_comma_list", "Articles 5, 6, 99", [5, 6, 99])
    case("portuguese_ordinals", "artigos 5.º, 6.º e 99.º do RGPD", [5, 6, 99])
    case("paragraph_after_list", "Articles 5, 6, Paragraph 99, point (a)", [5, 6])
    case("paragraph_then_new_article", "Article 6, Paragraph 99, and Article 37", [6, 37])
    case("soft_wrap", "Articles 5,\n6 and\n99", [5, 6, 99])
    case("nbsp", "ARTICLES\u00a05,\u202f6 AND 99", [5, 6, 99])
    case("blank_line_stops_list", "Article 6,\n\n99 examples", [6])

    for inflection in ["статья", "статьи", "статье", "статью", "статьей", "статьею",
                       "статьёй", "статьёю", "статей", "статьям", "статьями", "статьях", "СТАТЕЙ"]:
        case(f"russian_{inflection}", f"{inflection} 5, 6 и 99 GDPR", [5, 6, 99])
    case("german_dative", "Artikeln 5, 6 und 99 der DSGVO", [5, 6, 99])
    case("german_genitive", "des Artikels 99 der DSGVO", [99])
    case("english_article_possessive", "Article 6's requirements", [6])

    for symbol in ["-", "‐", "‑", "‒", "–", "—", "−", "~", "〜", "～"]:
        case(f"range_symbol_{ord(symbol)}", f"Articles 5 {symbol} 7", [5, 6, 7])
    for word, connector in [("Articles", "to"), ("articles", "à"), ("artículos", "a"),
                            ("Artikel", "bis"), ("artigos", "até"), ("статей", "до")]:
        case(f"range_word_{connector}", f"{word} 35 {connector} 37", [35, 36, 37])
    case("interior_unlisted", "Articles 35–37", [35, 36, 37])
    case("range_endpoint_unlisted", "Articles 6–8", [6, 7, 8])
    case("multiple_ranges", "Articles 4–6 and 35–37", [4, 5, 6, 35, 36, 37])
    case("repeated_word_range", "Article 35 to Article 37", [35, 36, 37])
    case("descending_range", "Articles 7–5", [7, 6, 5], ["descending-range"])
    case("large_range_rejected", "Articles 5–1000000000", [5, 1000000000], ["oversize-range"])

    for name, text, numbers in [
        ("zh_list", "第 5、6 和 99 条", [5, 6, 99]),
        ("tw_list", "第 5、6 及 99 條", [5, 6, 99]),
        ("ja_list", "第5、6及び99条", [5, 6, 99]),
        ("ko_list", "제5, 6 및 99조", [5, 6, 99]),
        ("zh_range", "第 35 至 37 条", [35, 36, 37]),
        ("tw_range", "第35條至第37條", [35, 36, 37]),
        ("ja_range", "第35条から第37条まで", [35, 36, 37]),
        ("ko_range", "제35조부터 제37조까지", [35, 36, 37]),
        ("zh_repeated_list", "第5条、第6条及第99条", [5, 6, 99]),
        ("ko_repeated_list", "제5조, 제6조 및 제99조", [5, 6, 99]),
        ("cjk_paragraph", "第6条、99項", [6]),
        ("ko_paragraph", "제6조, 99항", [6]),
    ]:
        case(name, text, numbers)

    for word in ["Article", "article", "artículo", "Artikel", "artigo", "статья"]:
        case(f"shorthand_{word}", f"{word} 6(1)(a)", [6], ["shorthand"])
    for text in ["第6条(1)(a)", "第6條（1）（a）", "第6(1)条", "제6조(1)(a)",
                 "Article 6 (1) (a)", "Article 6, (1)(a)"]:
        case("compact_subreference", text, [6], ["shorthand"])
    case("shorthand_later_list_item", "Articles 5, 6(1)(a) and 99", [5, 6, 99], ["shorthand"])
    case("shorthand_range_endpoint", "Articles 5–7(1)", [5, 6, 7], ["shorthand"])
    for abbreviation in ["Art.", "art.", "ART.", "Arts.", "artt.", "Art", "ст.", "ст. ст."]:
        case("abbreviation", f"{abbreviation} 6", [6], ["abbreviation"])
    case("compact_abbreviation", "Art.6(1)(a)", [6], ["abbreviation", "shorthand"])
    case("abbreviated_list", "Arts. 5, 6 and 99", [5, 6, 99], ["abbreviation"])
    case("later_abbreviation", "Article 5 and Art. 99", [5, 99], ["abbreviation"])
    case("explanation_not_shorthand", "Article 6 (GDPR); Article 5 (see sections 1 and 99)", [6, 5])

    for name, text in [
        ("sections", "sections 6 and 99; § 99; 第 4、6、99 节; 第99節; 第99節; 제99절"),
        ("versions", "版本 1.8; Version 1.8; Версия 1.8; v99.6"),
        ("paragraphs", "Paragraphs 1, 6 and 99; 第99項、第99款、第99号; 제99항"),
        ("ordinary_words", "articles about music; Art supplies; parties 99; 99 条记录"),
        ("identifiers", "Article99; someArticle 99; my_article 99; ArtObject99"),
        ("numbered_sections", "## 6. Section\n### 6.1 Details\n1. Version 99\n2. Example"),
        ("inline_code", "`Article 99` and ``Article 6(1)(a)`` and `第99条`"),
        ("fenced_code", "```python\nArticle 99\nArt. 6(1)(a)\n```\n"),
        ("tilde_code", "~~~text\nстатей 37, 35 и 99\n~~~\n"),
        ("long_fence", "````text\n```\nArticle 99\n```\n````\n"),
        ("unclosed_fence", "```text\nArticle 99\n"),
        ("html_comment", "<!-- Article 99 -->"),
        ("version_not_article", "Article 1.8; Article 2016/679; Article 6identifier"),
    ]:
        case(name, text, [])
    case("prose_after_code", "`Article 99`\n```text\nArticle 99\n```\nArticle 6", [6])
    case("markdown_label", "[Article 99](https://example.invalid/) and **Article 6**", [99, 6])
    case("line_numbers", "intro\n\nArticle 99", [99])
    # Do not weaken the whitelist using guessed regulation identities or context windows.
    case("no_context_exemption", "第 99 条", [99])
    case("other_law_not_exempt", "Article 99 of an unnamed law", [99])

    class CitationTests(unittest.TestCase):
        pass

    def make_test(text, expected, expected_problems):
        def test(self):
            citations = extract_citations(text)
            self.assertEqual(tuple(n for c in citations for n in c.numbers), expected)
            self.assertEqual({p for c in citations for p in c.problems}, expected_problems)
            issues, count = validate_citations(text, allowed)
            self.assertEqual(count, len(expected))
            actual_unlisted = {int(n) for issue in issues for n in re.findall(r"unlisted article (\d+)", issue)}
            self.assertEqual(actual_unlisted, set(expected) - allowed)
            for problem in expected_problems:
                self.assertTrue(any(PROBLEM_MESSAGES[problem] in issue for issue in issues))
            self.assertEqual(bool(issues), bool(expected_problems or set(expected) - allowed))
            if text == "intro\n\nArticle 99":
                self.assertTrue(all(issue.startswith("3:") for issue in issues))
        return test

    for index, (name, text, numbers, problems) in enumerate(cases):
        setattr(CitationTests, f"test_{index:03d}_{name}", make_test(text, numbers, problems))
    result = unittest.TextTestRunner(stream=sys.stdout, verbosity=1).run(
        unittest.defaultTestLoader.loadTestsFromTestCase(CitationTests)
    )
    failed = len(result.failures) + len(result.errors)
    print(f"self-test: {result.testsRun - failed}/{result.testsRun} cases passed")
    return not result.wasSuccessful()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--self-test", action="store_true", help="run citation unit cases without scanning documents")
    args = parser.parse_args(argv)
    if args.self_test:
        return self_test()

    reference = (ROOT / "doc" / "legal-reference.md").read_text(encoding="utf-8")
    allowed = set(re.findall(r"^\| 第 (\d+) 条 \|", reference, re.M))
    errors = []
    citations = 0
    if not allowed:
        errors.append("doc/legal-reference.md: empty article whitelist")

    for path in sorted(DOCS.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        label = path.relative_to(ROOT).as_posix()
        citation_issues, count = validate_citations(text, allowed)
        citations += count
        errors.extend(f"{label}:{issue}" for issue in citation_issues)
        if any(value in text for value in CORRUPT_TEXT):
            errors.append(f"{label}: malformed source-reference replacement")
        if any(value in text.lower() for value in STALE_DISCLOSURES):
            errors.append(f"{label}: stale artwork or contact-provenance disclosure")
        if path.stem not in POLICIES and "rc/sonic-20261031@a75f5cb" not in text:
            errors.append(f"{label}: missing candidate-source qualification")
        if path.stem == "deployment":
            checkout = "git checkout --detach a75f5cb54a2fe3593ba0da72b7ee9b1cc5c410a8"
            if text.count(checkout) != 2:
                errors.append(f"{label}: deployment examples must pin the reviewed candidate")

    for name in POLICIES:
        base = (DOCS / f"{name}.md").read_text(encoding="utf-8")
        base_tokens = Counter(re.findall(r"`([^`]+)`", base))
        sections = re.findall(r"^#{2,3} (\d+(?:\.\d+)?)(?:\.|\s)\s*", base, re.M)
        for locale in LOCALES:
            path = DOCS / locale / f"{name}.md"
            label = path.relative_to(ROOT).as_posix()
            if not path.exists():
                errors.append(f"{label}: missing policy")
                continue
            text = path.read_text(encoding="utf-8")
            versions = VERSION.findall(text[:500])
            if versions != ["1.8"]:
                errors.append(f"{label}: version {versions}")
            if not all(value in text for value in PROVENANCE):
                errors.append(f"{label}: incomplete source-review provenance")
            if re.findall(r"^#{2,3} (\d+(?:\.\d+)?)(?:\.|\s)\s*", text, re.M) != sections:
                errors.append(f"{label}: numbered heading mismatch")
            missing = base_tokens - Counter(re.findall(r"`([^`]+)`", text))
            if missing:
                errors.append(f"{label}: missing literal identifiers {dict(missing)}")
            for href in re.findall(r"(?<!!)\[[^\]]+\]\((/[^)]+)\)", text):
                if href.startswith("/images/"):
                    continue
                prefix = "/" if locale == "." else f"/{locale}/"
                wrong_root_locale = locale == "." and any(
                    href.startswith(f"/{other}/") for other in LOCALES[1:]
                )
                if not href.startswith(prefix) or wrong_root_locale:
                    errors.append(f"{label}: wrong locale link {href}")
            if any(old_version in text for old_version in ["1.6", "1.7"]):
                errors.append(f"{label}: stale policy version")
            if name == "privacy-policy":
                for identifier in ["docs.epocanvas.com/sonic/", "starlight-theme", "sl-sidebar-state", "Accept-Language"]:
                    if f"`{identifier}`" not in text:
                        errors.append(f"{label}: missing documentation-site disclosure {identifier}")
                if "Pagefind" not in text or "data URL" not in text:
                    errors.append(f"{label}: missing local-search or embedded-artwork disclosure")
            if name == "privacy-policy" and text.lower().count("webhook") < 2:
                errors.append(f"{label}: missing optional-alert disclosure or recipient")

    for error in errors:
        print(error)
    print(
        f"policies={len(POLICIES) * len(LOCALES)}, locales={len(LOCALES)}, "
        f"identified GDPR citation references={citations}, whitelist={len(allowed)}, errors={len(errors)}"
    )
    return bool(errors)


if __name__ == "__main__":
    sys.exit(main())
