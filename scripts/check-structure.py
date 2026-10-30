# -*- coding: utf-8 -*-
"""Structural symmetry check: every language's 8 legal docs (project intro + 7 legal docs)
must mirror the authoritative Simplified Chinese (root sonic/) version 1:1 — heading
counts, table row/column counts, figures, and note-block markers. Exit 1 on any mismatch.

Usage: python scripts/check-structure.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src" / "content" / "docs"
# base locale (Simplified Chinese, authoritative) sits at the collection root;
# reference translations live under en/ and ja/
SYMMETRIC_LANGS = [".", "en", "ja"]
DOCS = ["project", "overview", "privacy-policy", "terms-of-service",
        "acceptable-use", "data-security", "sub-processors", "key-terms"]

H = re.compile(r"^(#{2,3})\s+(.*)$", re.M)
FIG = re.compile(r"!\[[^\]]*\]\((/images/[^)]+)\)")
NOTE = re.compile(r"^:::\w*", re.M)


def profile(text):
    return {
        "h2h3": [(len(m.group(1)), m.group(2).strip()) for m in H.finditer(text)],
        "tables": [],  # filled below: list of (rows, cols) per table block
        "figs": FIG.findall(text),
        "notes": len(NOTE.findall(text)),
    }


def tables_of(text):
    out = []
    for block in re.split(r"\n\s*\n", text):
        lines = [ln for ln in block.splitlines() if ln.strip().startswith("|")]
        if len(lines) >= 2:
            cols = lines[0].count("|") - 1
            rows = len(lines) - 2  # minus header and separator
            out.append((rows, cols))
    return out


def main():
    bad = 0
    base_dir = SYMMETRIC_LANGS[0]
    for doc in DOCS:
        base_path = ROOT / base_dir / (doc + ".md")
        if not base_path.exists():
            print(f"MISSING {base_dir}/{doc}.md" if base_dir != "." else f"MISSING {doc}.md")
            bad += 1
            continue
        base = base_path.read_text(encoding="utf-8")
        bp = profile(base)
        bp["tables"] = tables_of(base)
        if len(bp["h2h3"]) == 0:
            print(f"EMPTY HEADINGS in {base_dir}/{doc}.md" if base_dir != "." else f"EMPTY HEADINGS in {doc}.md")
            bad += 1
        if not base.startswith("---"):
            print(f"INVALID FRONTMATTER in {base_dir}/{doc}.md" if base_dir != "." else f"INVALID FRONTMATTER in {doc}.md")
            bad += 1
        for lang in SYMMETRIC_LANGS[1:]:
            path_l = ROOT / lang / (doc + ".md")
            if not path_l.exists():
                print(f"MISSING {lang}/{doc}.md")
                bad += 1
                continue
            text = path_l.read_text(encoding="utf-8")
            p = profile(text)
            p["tables"] = tables_of(text)
            if len(p["h2h3"]) != len(bp["h2h3"]):
                print(f"MISMATCH {lang}/{doc}: headings {len(p['h2h3'])} != base {len(bp['h2h3'])}")
                bad += 1
            if p["tables"] != bp["tables"]:
                print(f"MISMATCH {lang}/{doc}: tables {p['tables']} != base {bp['tables']}")
                bad += 1
            if sorted(p["figs"]) != sorted(bp["figs"]):
                print(f"MISMATCH {lang}/{doc}: figures {sorted(p['figs'])} != base {sorted(bp['figs'])}")
                bad += 1
            if p["notes"] != bp["notes"]:
                print(f"MISMATCH {lang}/{doc}: note blocks {p['notes']} != base {bp['notes']}")
                bad += 1

    if bad:
        print(f"FAILED: {bad} structural/integrity mismatches")
        sys.exit(1)
    print(f"OK: {len(SYMMETRIC_LANGS)} languages structurally symmetric vs zh formal base ({len(DOCS)} docs)")


if __name__ == "__main__":
    main()
