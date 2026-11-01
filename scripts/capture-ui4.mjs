// Capture collapse mode + account sidebar area
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
  await page.waitForTimeout(4000);
  // collapse: the sidebar logo itself is the toggle button
  await page.locator('img[src="/logo.svg"]').first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(outDir, 'ui-collapse.png'), type: 'png' });
  console.log('saved ui-collapse.png');
  // expand back
  await page.locator('img[src="/logo.svg"]').first().click().catch(() => {});
  await page.waitForTimeout(1200);
  // account: sidebar strip including the bottom account entry
  await page.screenshot({ path: join(outDir, 'ui-account.png'), clip: { x: 0, y: 0, width: 460, height: 800 } });
  console.log('saved ui-account.png');
  console.log('DONE4');
} catch (err) {
  console.error('CAPTURE4 FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
