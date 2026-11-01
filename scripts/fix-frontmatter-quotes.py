# -*- coding: utf-8 -*-
"""Quote unquoted YAML title/description frontmatter values that contain ': '
(French/Italian typography) or start with special YAML characters."""
from pathlib import Path
import re

fixed = 0
for f in sorted(Path('src/content/docs').rglob('*.md')):
    lines = f.read_text(encoding='utf-8').splitlines(keepends=True)
    if not lines or lines[0].strip() != '---':
        continue
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end = i
            break
    if end is None:
        continue
    changed = False
    for i in range(1, end):
        m = re.match(r"^(title|description): (.*)\n?$", lines[i])
        if not m:
            continue
        val = m.group(2)
        if val.startswith('"') or val.startswith("'"):
            continue  # already quoted
        if ': ' in val or val.rstrip().endswith(':') or val.startswith(("'", '"', '[', '{', '&', '*', '!', '|', '>', '%', '@', '`')):
            escaped = val.replace('\\', '\\\\').replace('"', '\\"')
            lines[i] = '{}: "{}"\n'.format(m.group(1), escaped)
            changed = True
    if changed:
        f.write_text(''.join(lines), encoding='utf-8')
        fixed += 1
print('files fixed:', fixed)
