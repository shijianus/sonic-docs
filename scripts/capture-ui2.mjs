// Second pass: player drawer, clean settings, privacy section, mobile
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'images', 'sonic', 'ui');
const require = createRequire(join(here, 'noop.js'));
const { chromium } = require('D:/Users/Smart Kevin/OneDrive/Desktop/sonic/player/node_modules/.pnpm/playwright@1.56.1/node_modules/playwright');

const BASE = 'http://127.0.0.1:4400';
const shot = async (page, name) => {
  await page.screenshot({ path: join(outDir, name), type: 'png' });
  console.log('saved', name);
};

const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium-1248/chrome-win64/chrome.exe' });
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
  locale: 'zh-CN',
  colorScheme: 'light',
});

try {
  // 1. Search, play first song, then open the full player drawer from the bottom bar
  await page.goto(BASE + '/#/search', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  const input = page.locator('input[type="text"]').first();
  await input.fill('周杰伦');
  await input.press('Enter');
  await page.waitForTimeout(6000);
  await page.locator('.song-item').first().click();
  await page.waitForTimeout(6000);
  // bottom bar song title → open drawer
  const barTitle = page.locator('text=晴天').first();
  await barTitle.click();
  await page.waitForTimeout(5000);
  await shot(page, 'ui-player-drawer.png');

  // 2. Fresh settings page (no toast after reload)
  await page.goto(BASE + '/#/settings', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4000);
  await shot(page, 'ui-settings.png');

  // 3. Scroll to the privacy data section
  for (let i = 0; i < 10; i++) {
    const found = await page.getByText('清除推荐画像', { exact: false }).count();
    if (found) break;
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(500);
  }
  const priv = page.getByText('清除推荐画像', { exact: false }).first();
  if (await priv.count()) {
    await priv.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(1000);
    await shot(page, 'ui-privacy.png');
  } else {
    console.log('NO privacy section after scroll');
  }

  // 4. Mobile home
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-mobile-home.png');

  console.log('DONE2');
} catch (err) {
  console.error('CAPTURE2 FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
