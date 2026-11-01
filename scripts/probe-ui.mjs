import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'images', 'sonic', 'ui');
const require = createRequire(join(here, 'noop.js'));
const { chromium } = require('D:/Users/Smart Kevin/OneDrive/Desktop/sonic/player/node_modules/.pnpm/playwright@1.56.1/node_modules/playwright');

const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, locale: 'zh-CN' });
try {
  await page.goto('http://127.0.0.1:4400/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4000);
  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).slice(0, 8).map(i => ({ src: i.getAttribute('src'), vis: !!(i.offsetWidth || i.offsetHeight) })));
  console.log(JSON.stringify(imgs, null, 1));
  // find the collapse toggle by title
  const btns = await page.evaluate(() => Array.from(document.querySelectorAll('button[title], button[aria-label]')).slice(0, 20).map(b => ({ t: b.title || b.getAttribute('aria-label'), vis: !!(b.offsetWidth || b.offsetHeight) })));
  console.log(JSON.stringify(btns.slice(0, 10), null, 1));
} catch (err) {
  console.error('FAIL:', err.message);
} finally {
  await browser.close();
}
