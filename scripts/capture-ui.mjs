// Real-UI screenshot capture for SonicDocs (run: node scripts/capture-ui.mjs)
// Uses the playwright dependency from the sibling sonic repo (read-only usage).
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..', 'public', 'images', 'sonic', 'ui');
mkdirSync(outDir, { recursive: true });

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
  // 1. Home
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-home.png');

  // 2. Search results
  await page.goto(BASE + '/#/search', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  const input = page.locator('input[type="text"], input:not([type])').first();
  await input.fill('周杰伦');
  await input.press('Enter');
  await page.waitForTimeout(6000);
  await shot(page, 'ui-search.png');

  // 3. Player drawer with lyrics (click first song row)
  const row = page.locator('.song-item').first();
  if (await row.count()) {
    await row.click();
    await page.waitForTimeout(7000);
    await shot(page, 'ui-player.png');
    // try to switch lyrics view if a toggle exists
    const lyricBtn = page.getByText('歌词', { exact: false }).first();
    if (await lyricBtn.count()) {
      await lyricBtn.click().catch(() => {});
      await page.waitForTimeout(2500);
      await shot(page, 'ui-player-lyrics.png');
    }
  } else {
    console.log('NO song-item found on search page');
  }

  // 4. Settings full page
  await page.goto(BASE + '/#/settings', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await shot(page, 'ui-settings.png');

  // 5. Settings privacy section
  const priv = page.getByText('清除推荐画像', { exact: false }).first();
  if (await priv.count()) {
    await priv.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(800);
    await shot(page, 'ui-privacy.png');
  } else {
    console.log('NO privacy section text found');
  }

  // 6. Mobile home
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-mobile-home.png');

  console.log('DONE');
} catch (err) {
  console.error('CAPTURE FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
