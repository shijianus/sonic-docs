# -*- coding: utf-8 -*-
"""Update zh interface.md section 1: add radar figure, sidebar collapse/account notes."""
from pathlib import Path

p = Path('src/content/docs/interface.md')
lines = p.read_text(encoding='utf-8').splitlines(keepends=True)

i1 = next(i for i, l in enumerate(lines) if l.startswith('## 1. 首页与智能推荐'))
i2 = next(i for i, l in enumerate(lines) if l.startswith('## 2. 搜索'))

new_block = """## 1. 首页与智能推荐

首页聚合三个内容区：

1. **轮播推荐位**：展示新歌、新碟与热歌推荐，卡片标有「sonic 新歌」「sonic 热歌推荐」等来源标识，点击直接进入播放或详情；
2. **智能推荐与音乐雷达**：提供「猜你喜欢」「站内趋势热榜」「风格探索雷达」三个视图，附「换一批」与「播放推荐列表」操作；完成一次搜索后，雷达会依你的搜索意图与偏好信号动态展示匹配结果。推荐卡片标注推荐理由（如「个性化推荐」徽章与「常听某歌手」「与你偏爱的曲风相近」等说明），移动端首页并显示当前会话之偏好信号标签（如歌手、流派）；推荐依据之信号类别见[隐私政策](/privacy-policy/)第 4.2 节；
3. **推荐歌单与热门单曲**：按全站真实听歌趋势生成，播放量标注于卡片。

![Sonic 首页之音乐与风格雷达：完成搜索后，雷达依偏好信号展示匹配结果，与热门单曲样式对齐](/images/sonic/ui/ui-radar.png)

*图：搜索后的音乐与风格雷达。雷达结果与「热门单曲」卡片样式对齐，推荐理由与偏好信号标签透明呈现。*

推荐之排序仅影响您看到的播放序列；您可于设置中关闭个性化（见第 9 节），关闭后推荐切换为纯公共模式。

### 1.1 侧边栏：折叠模式与帐号入口

侧边栏顶部之品牌 Logo 即为折叠开关：点击将侧栏收起为窄条（图标模式），再次点击展开。侧栏底部集成 Epomail 帐号入口：未登录时显示登录引导，登录后显示帐户昵称与入口，登录状态跨标签页同步。
""".splitlines(keepends=True)

lines[i1:i2] = new_block
p.write_text(''.join(lines), encoding='utf-8')
import re
t = ''.join(lines)
print('patched: h2', len(re.findall(r'^## ', t, re.M)), '| h3', len(re.findall(r'^### ', t, re.M)), '| figs', len(re.findall(r'!\[', t, re.M)))
