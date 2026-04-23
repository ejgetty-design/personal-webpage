import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const logoB64 = readFileSync(resolve('/Users/chris/Desktop/Claude/emma-website/public/logo-full.png')).toString('base64');

const html = `<!doctype html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500&display=swap');
  html, body { margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', system-ui, sans-serif;
    color: #3D4435;
    position: relative;
  }
  .frame {
    position: absolute;
    inset: 24px;
    border: 1px solid rgba(61,68,53,0.12);
    border-radius: 12px;
  }
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
  }
  .logo { width: 460px; height: auto; display: block; }
  .tag {
    font-family: 'Marcellus', serif;
    font-size: 28px;
    color: #6B6F62;
    letter-spacing: 0.02em;
  }
</style>
</head>
<body>
  <div class="frame"></div>
  <div class="wrap">
    <img class="logo" src="data:image/png;base64,${logoB64}" />
    <div class="tag">Fractional finance for growing companies</div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({
  path: '/Users/chris/Desktop/Claude/emma-website/public/og-default.png',
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});
await browser.close();
console.log('wrote og-default.png');
