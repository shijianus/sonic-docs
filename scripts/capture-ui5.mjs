import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'images', 'sonic', 'ui');
const require = createRequire(join(here, 'noop.js'));
const { chromium } = require('D:/Users/Smart Kevin/OneDrive/Desktop/sonic/player/node_modules/.pnpm/playwright@1.56.1/node_modules/playwright');

const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe' });
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
  locale: 'zh-CN',
  colorScheme: 'light',
});

try {
  await page.goto('http://127.0.0.1:4400/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4500);
  // The sidebar logo button sits at the top-left (~62,88 in CSS px). Click it to collapse.
  await page.mouse.click(62, 88);
  await page.waitForTimeout(1800);
  const collapsed = await page.evaluate(() => document.body.innerHTML.includes('collapsed') || true);
  await page.screenshot({ path: join(outDir, 'ui-collapse.png'), type: 'png' });
  console.log('saved ui-collapse.png');
  // expand back (logo moves to collapsed header top-left, still around the same spot)
  await page.mouse.click(50, 80);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(outDir, 'ui-account.png'), clip: { x: 0, y: 0, width: 460, height: 800 } });
  console.log('saved ui-account.png');
  console.log('DONE5');
} catch (err) {
  console.error('CAPTURE5 FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
