// Third capture pass: fresh UI after sonic updates (new logo, radar, collapse, account)
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
  // 1. Home (new logo, fresh)
  await page.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-home.png');

  // 2. Search results
  await page.goto(BASE + '/#/search', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  const input = page.locator('input[type="text"]').first();
  await input.fill('周杰伦');
  await input.press('Enter');
  await page.waitForTimeout(6000);
  await shot(page, 'ui-search.png');

  // 3. Music & style radar on home (shows after search)
  await page.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(6000);
  await shot(page, 'ui-radar.png');

  // 4. Play first song from search, bottom bar
  await page.goto(BASE + '/#/search', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);
  await page.locator('input[type="text"]').first().fill('晴天');
  await page.locator('input[type="text"]').first().press('Enter');
  await page.waitForTimeout(6000);
  await page.locator('.song-item').first().click();
  await page.waitForTimeout(5000);
  await shot(page, 'ui-player.png');

  // 5. Player drawer
  await page.locator('#footer-cover').click();
  await page.waitForTimeout(6000);
  await shot(page, 'ui-player-drawer.png');

  // 6. Settings
  await page.goto(BASE + '/#/settings', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4000);
  await shot(page, 'ui-settings.png');

  // 7. Privacy section
  for (let i = 0; i < 14; i++) {
    const found = await page.getByText('隐私与本地数据', { exact: false }).count();
    if (found) break;
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(400);
  }
  const priv = page.getByText('隐私与本地数据', { exact: false }).first();
  if (await priv.count()) {
    await priv.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(1000);
    await shot(page, 'ui-privacy.png');
  } else {
    console.log('NO privacy section');
  }

  // 8. Charts
  await page.goto(BASE + '/#/charts', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(6000);
  await shot(page, 'ui-charts.png');

  // 9. Artists
  await page.goto(BASE + '/#/artists', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-artists.png');

  // 10. Sidebar collapse mode (click 收起侧边栏 toggle)
  await page.setViewportSize({ width: 1280, height: 800 });
  const collapseBtn = page.locator('[aria-label*="收起"], [title*="收起"]').first();
  if (await collapseBtn.count()) {
    await collapseBtn.click();
    await page.waitForTimeout(1500);
    await shot(page, 'ui-collapse.png');
    // expand back
    const expandBtn = page.locator('[aria-label*="展开"], [title*="展开"]').first();
    if (await expandBtn.count()) await expandBtn.click().catch(() => {});
    await page.waitForTimeout(800);
  } else {
    console.log('NO collapse button found');
  }

  // 11. Account area (logged-out SidebarAccount state): scroll sidebar bottom & hover
  const acct = page.locator('text=Epomail').first();
  if (await acct.count()) {
    await acct.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(800);
    await shot(page, 'ui-account.png');
  } else {
    console.log('NO account element found');
  }

  // 12. Mobile home
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE + '/#/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(5000);
  await shot(page, 'ui-mobile-home.png');

  console.log('DONE3');
} catch (err) {
  console.error('CAPTURE3 FAILED:', err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
