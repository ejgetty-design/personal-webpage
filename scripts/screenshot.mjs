import { chromium, devices } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4321';

const viewports = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  { name: 'mobile', ...devices['iPhone 14'].viewport, deviceScaleFactor: 2, isMobile: true, userAgent: devices['iPhone 14'].userAgent },
];

const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];

const browser = await chromium.launch();

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    userAgent: vp.userAgent,
  });
  const page = await ctx.newPage();

  for (const path of paths) {
    const url = new URL(path, BASE).toString();
    await page.goto(url, { waitUntil: 'networkidle' });
    const safe = path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home';
    const file = `/tmp/shot-${safe}-${vp.name}.png`;
    const fullPage = process.env.FULL_PAGE !== '0';
    await page.screenshot({ path: file, fullPage });
    console.log(`${vp.name} ${path} -> ${file}`);

    // Also report layout debug info
    const info = await page.evaluate(() => {
      const btn = document.getElementById('nav-toggle');
      const bodyScrollW = document.body.scrollWidth;
      const viewportW = window.innerWidth;
      let btnRect = null;
      if (btn) {
        const r = btn.getBoundingClientRect();
        btnRect = { x: r.x, y: r.y, w: r.width, h: r.height, visible: r.width > 0 && r.height > 0 };
      }
      return { viewportW, bodyScrollW, overflow: bodyScrollW - viewportW, btn: btnRect };
    });
    console.log(`  viewport=${info.viewportW} scrollW=${info.bodyScrollW} overflow=${info.overflow} btn=${JSON.stringify(info.btn)}`);
  }

  await ctx.close();
}

await browser.close();
