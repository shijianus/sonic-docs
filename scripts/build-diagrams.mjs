// Generates the shared Sonic documentation diagram set.
// Run with `node scripts/build-diagrams.mjs`; output is committed under public/images/sonic/.
// Labels stay short and technical; the localized legend below each figure carries the meaning.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const out = fileURLToPath(new URL('../public/images/sonic/', import.meta.url));

const LIGHT = {
  bg: '#f8fafc',
  card: '#ffffff',
  soft: '#f1f5f9',
  border: '#e2e8f0',
  title: '#0f172a',
  body: '#475569',
  muted: '#64748b',
  accent: '#2563eb',
  accentSoft: '#eff6ff',
  accentBorder: '#bfdbfe',
  amber: '#b45309',
  amberSoft: '#fffbeb',
  green: '#15803d',
  greenSoft: '#f0fdf4',
};

const DARK = {
  bg: '#0b0f19',
  card: '#111827',
  soft: '#0f172a',
  border: '#1e293b',
  title: '#f8fafc',
  body: '#cbd5e1',
  muted: '#94a3b8',
  accent: '#60a5fa',
  accentSoft: 'rgba(59,130,246,0.12)',
  accentBorder: '#1d4ed8',
  amber: '#fbbf24',
  amberSoft: 'rgba(245,158,11,0.12)',
  green: '#4ade80',
  greenSoft: 'rgba(34,197,94,0.12)',
};

const FONT = "-apple-system, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans CJK SC', sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

// 两套独立配色：站点主题切换时由页面选择对应文件，不依赖操作系统的 prefers-color-scheme。
function style(theme = 'light') {
  const C = theme === 'dark' ? DARK : LIGHT;
  const warmBorder = theme === 'dark' ? '#92400e' : '#fcd34d';
  const goodBorder = theme === 'dark' ? '#166534' : '#bbf7d0';
  return `<style>
    .bg{fill:${C.bg}} .card{fill:${C.card};stroke:${C.border};stroke-width:1.5}
    .soft{fill:${C.soft};stroke:${C.border};stroke-width:1.5}
    .accent{fill:${C.accentSoft};stroke:${C.accentBorder};stroke-width:1.6}
    .warm{fill:${C.amberSoft};stroke:${warmBorder};stroke-width:1.5}
    .good{fill:${C.greenSoft};stroke:${goodBorder};stroke-width:1.5}
    .kicker{font:700 12px ${FONT};letter-spacing:.18em;fill:${C.accent}}
    .num{font:700 13px ${FONT};fill:${C.accent}}
    .label{font:600 18px ${FONT};fill:${C.title}}
    .label-sm{font:600 15px ${FONT};fill:${C.title}}
    .meta{font:400 12.5px ${FONT};fill:${C.muted}}
    .mono{font:400 12px ${MONO};fill:${C.muted}}
    .foot{font:600 12px ${FONT};fill:${C.muted}}
    .stroke{stroke:${C.border};stroke-width:1.5;fill:none}
    .accent-stroke{stroke:${C.accent};stroke-width:1.8;fill:none}
    .arrow{stroke:${C.muted};stroke-width:1.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .arrow-head{fill:${C.muted}}
    .icon{stroke:${C.body};stroke-width:1.7;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .icon-accent{stroke:${C.accent};stroke-width:1.9;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .dot{fill:${C.accent}}
    ${theme === 'light' ? '@media print{ .bg{fill:#fff} }' : ''}
  </style>`;
}

const ICONS = {
  doc: 'M7 3h7l4 4v14H7z M14 3v5h4 M10 12h7 M10 16h7',
  shield: 'M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6z M9 12l2 2 4-4',
  scale: 'M12 4v16 M6 8h12 M6 8l-3 6h6z M18 8l-3 6h6z M8 20h8',
  target: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 12h.01',
  funnel: 'M4 5h16l-6 7v6l-4 2v-8z',
  lock: 'M6 11h12v9H6z M9 11V8a3 3 0 0 1 6 0v3 M12 15v2',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4 21a8 8 0 0 1 16 0',
  cloud: 'M7 18h10a4 4 0 0 0 .6-7.9A6 6 0 0 0 6.2 9.5 4.2 4.2 0 0 0 7 18z',
  server: 'M4 5h16v5H4z M4 14h16v5H4z M7 7.5h.01 M7 16.5h.01',
  db: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  play: 'M8 5l11 7-11 7z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M16.5 16.5L21 21',
  download: 'M12 4v11 M7 11l5 5 5-5 M5 20h14',
  bell: 'M6 17h12l-2-3V9a4 4 0 0 0-8 0v5z M10 20h4',
  handshake: 'M4 12l4-4 4 4 4-4 4 4 M8 8v8 M16 8v8 M4 16h16',
  pause: 'M8 5v14 M16 5v14',
  stop: 'M6 6h12v12H6z',
  gavel: 'M4 20h16 M8 13l7-7 3 3-7 7z M6 15l3 3 M14 4l3 3',
  globe: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M4 12h16 M12 4c2.5 2.3 4 5 4 8s-1.5 5.7-4 8c-2.5-2.3-4-5-4-8s1.5-5.7 4-8z',
  code: 'M9 7l-5 5 5 5 M15 7l5 5-5 5',
  key: 'M15 8a4 4 0 1 0-3.6 4L4 19v2h3v-2h2v-2h2l1.4-1.4A4 4 0 0 0 15 8z',
  music: 'M9 18V6l10-2v11 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M19 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  image: 'M4 5h16v14H4z M4 16l5-5 4 4 3-3 4 4 M9 9h.01',
  warning: 'M12 4l9 16H3z M12 9v5 M12 17h.01',
  check: 'M5 12l4 4 10-10',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M12 2v3 M12 19v3 M4.9 4.9l2.1 2.1 M17 17l2.1 2.1 M2 12h3 M19 12h3 M4.9 19.1L7 17 M17 7l2.1-2.1',
  list: 'M4 6h16 M4 12h16 M4 18h10',
  headphones: 'M4 14v-2a8 8 0 0 1 16 0v2 M4 14h3v6H5a1 1 0 0 1-1-1z M20 14h-3v6h2a1 1 0 0 0 1-1z',
  phone: 'M7 3h10v18H7z M11 18h2',
  chart: 'M4 20V4 M4 20h16 M8 16v-4 M12 16V8 M16 16v-6',
  layers: 'M12 3l9 5-9 5-9-5z M3 13l9 5 9-5',
  mail: 'M3 6h18v12H3z M3 7l9 6 9-6',
  eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  route: 'M5 5h6a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8h12 M17 18l3 3-3 3',
  refresh: 'M20 7a8 8 0 1 0 1 7 M20 3v4h-4',
  sliders: 'M4 7h10 M18 7h2 M4 17h4 M12 17h8 M14 4v6 M8 14v6',
};

function icon(name, x, y, size = 26, cls = 'icon') {
  const scale = size / 24;
  return `<g class="${cls}" transform="translate(${x} ${y}) scale(${scale.toFixed(3)})"><path d="${ICONS[name] || ICONS.doc}"/></g>`;
}

function header() {
  return `<text class="kicker" x="64" y="46">SONIC</text><line x1="64" y1="60" x2="936" y2="60" class="stroke"/>`;
}

function card(x, y, w, h, { n, iconName, label, meta, tone = 'card', url }) {
  const toneClass = tone === 'accent' ? 'accent' : tone === 'warm' ? 'warm' : tone === 'good' ? 'good' : tone === 'soft' ? 'soft' : 'card';
  const parts = [`<rect class="${toneClass}" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>`];
  if (iconName) parts.push(icon(iconName, x + w - 46, y + 16, 24, tone === 'accent' ? 'icon-accent' : 'icon'));
  if (h < 110) {
    // Short cards keep the index, label and meta on three compact baselines.
    const baseline = meta ? y + h - 33 : y + h / 2 + 5;
    if (n) parts.push(`<circle class="dot" cx="${x + 26}" cy="${baseline - 5}" r="3"/>`, `<text class="num" x="${x + 36}" y="${baseline}">${n}</text>`);
    if (label) parts.push(`<text class="label-sm" x="${x + 58}" y="${baseline}">${label}</text>`);
    if (meta) parts.push(`<text class="meta" x="${x + 58}" y="${y + h - 12}">${meta}</text>`);
    if (url) parts.push(`<text class="mono" x="${x + 58}" y="${y + h - 12}">${url}</text>`);
  } else {
    if (n) parts.push(`<circle class="dot" cx="${x + 26}" cy="${y + 25}" r="3"/>`, `<text class="num" x="${x + 36}" y="${y + 30}">${n}</text>`);
    if (label) parts.push(`<text class="label" x="${x + 24}" y="${y + h - 42}">${label}</text>`);
    if (meta) parts.push(`<text class="meta" x="${x + 24}" y="${y + h - 21}">${meta}</text>`);
    if (url) parts.push(`<text class="mono" x="${x + 24}" y="${y + h - 21}">${url}</text>`);
  }
  return parts.join('');
}

function arrow(x1, y1, x2, y2) {
  return `<path class="arrow" d="M${x1} ${y1}L${x2} ${y2}"/><path class="arrow-head" d="M${x2 - 6} ${y2 - 4}L${x2} ${y2}L${x2 - 7} ${y2 + 3}Z"/>`;
}

function svg({ width = 1000, height = 420, title, body, theme = 'light' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${title}">
${style(theme)}
<rect class="bg" width="${width}" height="${height}" rx="18"/>
${header()}${body}
</svg>
`;
}

function grid(cards, { cols = 3, top = 92, bottom = 380, gap = 20, pad = 64 } = {}) {
  const width = 1000 - pad * 2;
  const rows = Math.ceil(cards.length / cols);
  const h = (bottom - top - gap * (rows - 1)) / rows;
  const w = (width - gap * (cols - 1)) / cols;
  return cards.map((c, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const rowCount = Math.min(cols, cards.length - row * cols);
    const offset = (width - (rowCount * w + (rowCount - 1) * gap)) / 2;
    return card(pad + offset + col * (w + gap), top + row * (h + gap), w, h, c);
  }).join('');
}

function flow(cards, { top = 130, h = 150, gap = 26, pad = 64 } = {}) {
  const width = 1000 - pad * 2;
  const w = (width - gap * (cards.length - 1)) / cards.length;
  const parts = cards.map((c, i) => card(pad + i * (w + gap), top, w, h, c));
  for (let i = 0; i < cards.length - 1; i++) {
    const x = pad + (i + 1) * w + i * gap + 4;
    parts.push(arrow(x, top + h / 2, x + gap - 10, top + h / 2));
  }
  return parts.join('');
}

const specs = [
  {
    name: 'legal-architecture',
    title: 'Legal document map with seven numbered documents',
    body: grid([
      { n: '01', iconName: 'doc', label: 'Terms of Service', url: '/terms-of-service', tone: 'accent' },
      { n: '02', iconName: 'shield', label: 'Privacy Policy', url: '/privacy-policy' },
      { n: '03', iconName: 'handshake', label: 'Acceptable Use', url: '/acceptable-use' },
      { n: '04', iconName: 'lock', label: 'Data &amp; Security', url: '/data-security' },
      { n: '05', iconName: 'cloud', label: 'Third Parties', url: '/sub-processors' },
      { n: '06', iconName: 'list', label: 'Key Terms', url: '/key-terms' },
      { n: '07', iconName: 'route', label: 'Project Overview', url: '/project' },
    ], { cols: 4, top: 88, bottom: 356 }),
  },
  {
    name: 'privacy-pillars',
    title: 'Five privacy principles',
    body: grid([
      { n: '01', iconName: 'scale', label: 'Lawful basis', meta: 'each purpose' },
      { n: '02', iconName: 'target', label: 'Purpose limit', meta: 'no scope creep' },
      { n: '03', iconName: 'funnel', label: 'Minimisation', meta: 'collect less' },
      { n: '04', iconName: 'lock', label: 'Security', meta: 'verify setup' },
      { n: '05', iconName: 'user', label: 'Your rights', meta: 'access, erase' },
    ], { cols: 5, top: 100, bottom: 356 }),
  },
  {
    name: 'security-shield',
    title: 'Four security layers L1 to L4',
    body: [
      card(64, 84, 872, 66, { n: 'L1', iconName: 'globe', label: 'Transport &amp; access', meta: 'HTTPS depends on deployment; internal links may differ' }),
      card(64, 162, 872, 66, { n: 'L2', iconName: 'key', label: 'Authentication &amp; signing', meta: 'OAuth + PKCE; signing protects integrity, not confidentiality' }),
      card(64, 240, 872, 66, { n: 'L3', iconName: 'route', label: 'Outbound request checks', meta: 'proxy and redirect checks do not cover direct browser requests' }),
      card(64, 318, 872, 66, { n: 'L4', iconName: 'db', label: 'Storage &amp; logs', meta: 'isolation, access, retention and backups need operator setup' }),
    ].join(''),
  },
  {
    name: 'tos-contract',
    title: 'Service terms in five numbered steps',
    body: flow([
      { n: '01', iconName: 'bell', label: 'Notice', meta: 'before acceptance' },
      { n: '02', iconName: 'check', label: 'Acceptance', meta: 'valid act' },
      { n: '03', iconName: 'play', label: 'Use', meta: 'free test' },
      { n: '04', iconName: 'refresh', label: 'Changes', meta: 'notify first' },
      { n: '05', iconName: 'doc', label: 'Termination', meta: 'exit keeps rights' },
    ], { top: 128, h: 158 }),
  },
  {
    name: 'aup-ladder',
    height: 470,
    title: 'Proportionate enforcement from notice to termination',
    body: [
      card(64, 286, 200, 84, { n: '01', iconName: 'bell', label: 'Notice', meta: 'reasons where feasible' }),
      card(286, 226, 200, 84, { n: '02', iconName: 'sliders', label: 'Throttle', meta: 'limit access' }),
      card(508, 166, 200, 84, { n: '03', iconName: 'pause', label: 'Suspend', meta: 'temporary limits' }),
      card(730, 106, 206, 84, { n: '04', iconName: 'stop', label: 'Terminate', meta: 'separate review' }),
      arrow(268, 320, 278, 292), arrow(490, 260, 500, 232), arrow(712, 200, 722, 172),
      card(64, 388, 430, 52, { n: 'R', iconName: 'refresh', label: 'Review &amp; appeal', tone: 'soft' }),
      card(506, 388, 430, 52, { n: 'L', iconName: 'gavel', label: 'Lawful requests', tone: 'soft' }),
    ].join(''),
  },
  {
    name: 'sharing-map',
    title: 'Six third-party recipient groups A to F',
    body: [
      `<line x1="500" y1="86" x2="500" y2="356" class="stroke"/>`,
      `<circle class="accent" cx="500" cy="220" r="46"/><text class="label-sm" x="500" y="226" text-anchor="middle">Sonic</text>`,
      card(64, 82, 330, 78, { n: 'A', iconName: 'cloud', label: 'Infrastructure', meta: 'Cloudflare edge and tunnel' }),
      card(64, 182, 330, 78, { n: 'B', iconName: 'user', label: 'Identity', meta: 'Epomail OAuth' }),
      card(64, 282, 330, 78, { n: 'C', iconName: 'music', label: 'Content sources', meta: 'music and lyrics APIs' }),
      card(606, 82, 330, 78, { n: 'D', iconName: 'image', label: 'External resources', meta: 'fonts, avatars, media' }),
      card(606, 182, 330, 78, { n: 'E', iconName: 'gavel', label: 'Legal requests', meta: 'valid basis required' }),
      card(606, 282, 330, 78, { n: 'F', iconName: 'globe', label: 'Transfers', meta: 'mechanism and safeguards' }),
      arrow(394, 121, 452, 190), arrow(394, 221, 454, 220), arrow(394, 321, 452, 252),
      arrow(606, 121, 548, 190), arrow(606, 221, 546, 220), arrow(606, 321, 548, 252),
    ].join(''),
  },
  {
    name: 'key-terms-map',
    title: 'Four groups of legal and technical terms',
    body: grid([
      { n: '01', iconName: 'user', label: 'Legal roles', meta: 'controller · processor' },
      { n: '02', iconName: 'db', label: 'Data states', meta: 'pseudonymous · anonymous' },
      { n: '03', iconName: 'gear', label: 'Processing', meta: 'collect · use · erase' },
      { n: '04', iconName: 'code', label: 'Technical terms', meta: 'OAuth · SQLite · CDN' },
    ], { cols: 2, top: 100, bottom: 356, pad: 150, gap: 28 }),
  },
  {
    name: 'quickstart-steps',
    title: 'Quick start in four steps',
    body: flow([
      { n: '01', iconName: 'globe', label: 'Open', meta: 'browser or mobile' },
      { n: '02', iconName: 'search', label: 'Search', meta: 'song, artist, album' },
      { n: '03', iconName: 'play', label: 'Play', meta: 'quality and lyrics' },
      { n: '04', iconName: 'sliders', label: 'Tune', meta: 'privacy and theme' },
    ], { top: 128, h: 158 }),
  },
  {
    name: 'features-map',
    title: 'Six feature groups',
    body: grid([
      { n: '01', iconName: 'search', label: 'Search', meta: 'fuzzy and pinyin' },
      { n: '02', iconName: 'headphones', label: 'Playback', meta: 'quality and modes' },
      { n: '03', iconName: 'music', label: 'Lyrics', meta: 'word-level timing' },
      { n: '04', iconName: 'download', label: 'Library', meta: 'favourites and offline' },
      { n: '05', iconName: 'chart', label: 'Recommend', meta: 'profile and feedback' },
      { n: '06', iconName: 'shield', label: 'Privacy', meta: 'controls and reset' },
    ], { cols: 3, top: 92, bottom: 356 }),
  },
  {
    name: 'library-storage',
    title: 'Three storage locations: local favourites, offline files and remote processing',
    body: [
      card(64, 100, 270, 240, { n: '01', iconName: 'list', label: 'Favourites &amp; history', meta: 'localStorage', tone: 'accent' }),
      card(365, 100, 270, 240, { n: '02', iconName: 'download', label: 'Downloads &amp; local files', meta: 'IndexedDB' }),
      card(666, 100, 270, 240, { n: '03', iconName: 'cloud', label: 'Remote processing', meta: 'profiles, search, backup' }),
      `<line x1="64" y1="366" x2="936" y2="366" class="stroke"/>`,
      `<text class="foot" x="64" y="390">Local data is not automatically a remote copy; clearing the browser is not a full erasure.</text>`,
    ].join(''),
  },
  {
    name: 'troubleshooting-flow',
    title: 'Troubleshooting in four steps',
    body: flow([
      { n: '01', iconName: 'warning', label: 'Symptom', meta: 'degraded or failed' },
      { n: '02', iconName: 'eye', label: 'Check status', meta: 'banner and retry' },
      { n: '03', iconName: 'route', label: 'Fallback', meta: 'may also fail' },
      { n: '04', iconName: 'mail', label: 'Report', meta: 'scrub sensitive data' },
    ], { top: 128, h: 158 }),
  },
];

for (const spec of specs) {
  writeFileSync(join(out, `${spec.name}.svg`), svg(spec), 'utf8');
}

// The bilingual language chooser keeps its four reading paths.
const readingPaths = (theme) => svg({
  width: 960,
  height: 240,
  theme,
  title: 'Four reading paths through the Sonic documentation',
  body: [
    ...[
      { n: '01', iconName: 'doc', label: 'Start', meta: 'Overview · Quick start' },
      { n: '02', iconName: 'headphones', label: 'Explore', meta: 'Interface · Search' },
      { n: '03', iconName: 'shield', label: 'Understand', meta: 'Privacy · Terms' },
      { n: '04', iconName: 'code', label: 'Build', meta: 'Deploy · Develop' },
    ].map((c, i) => card(48 + i * 220, 78, 204, 126, c)).join(''),
  ].join(''),
});

// The two-plane architecture is a custom schematic with named components.
const project = (theme) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 460" width="100%" role="img" aria-label="Sonic two-plane architecture: browser, Cloudflare edge control plane, Linux data plane and upstream CDNs">
${style(theme)}
<rect class="bg" width="1000" height="460" rx="18"/>
${header()}
<rect class="card" x="64" y="90" width="220" height="300" rx="16"/>
<text class="num" x="88" y="122">01 · CLIENT</text>
${icon('globe', 88, 140, 30, 'icon-accent')}
<text class="label" x="88" y="210">Browser</text>
<text class="meta" x="88" y="234">sonic.epocanvas.tech</text>
<text class="meta" x="88" y="256">player and local storage</text>
<text class="meta" x="88" y="278">OAuth session</text>
<rect class="card" x="324" y="90" width="280" height="300" rx="16"/>
<text class="num" x="348" y="122">02 · CONTROL PLANE</text>
${icon('cloud', 348, 140, 30, 'icon-accent')}
<text class="label" x="348" y="210">Cloudflare Edge</text>
<text class="meta" x="348" y="234">Pages Functions</text>
<text class="meta" x="348" y="256">routing · rate limit · cache</text>
<text class="meta" x="348" y="278">auth check · circuit breaker</text>
<text class="meta" x="348" y="300">audio proxy (Range 206)</text>
<rect class="card" x="644" y="90" width="292" height="300" rx="16"/>
<text class="num" x="668" y="122">03 · DATA PLANE</text>
${icon('server', 668, 140, 30, 'icon-accent')}
<text class="label" x="668" y="210">Linux Engine</text>
<text class="meta" x="668" y="234">Node.js · SQLite WAL</text>
<text class="meta" x="668" y="256">protocol parsing</text>
<text class="meta" x="668" y="278">recommendation core</text>
<text class="meta" x="668" y="300">loopback-only sidecar</text>
${arrow(284, 220, 316, 220)}${arrow(604, 220, 636, 220)}
<rect class="soft" x="324" y="404" width="612" height="42" rx="10"/>
<text class="meta" x="348" y="430">encrypted tunnel · service key required</text>
${icon('music', 790, 410, 22)}
<text class="meta" x="820" y="430">official CDNs</text>
</svg>
`;

for (const theme of ['light', 'dark']) {
  const suffix = theme === 'dark' ? '-dark' : '';
  for (const spec of specs) {
    writeFileSync(join(out, `${spec.name}${suffix}.svg`), svg({ ...spec, theme }), 'utf8');
  }
  writeFileSync(join(out, `reading-paths${suffix}.svg`), readingPaths(theme), 'utf8');
  writeFileSync(join(out, `project-architecture${suffix}.svg`), project(theme), 'utf8');
}

console.log(`Wrote ${(specs.length + 2) * 2} diagrams to public/images/sonic/`);
