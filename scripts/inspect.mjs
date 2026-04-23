import { chromium, devices } from 'playwright';
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });

const info = await page.evaluate(() => {
  const pick = (sel, label) => {
    const el = document.querySelector(sel);
    if (!el) return { label, missing: true };
    const s = getComputedStyle(el);
    return {
      label, sel,
      color: s.color, bg: s.backgroundColor,
      fontSize: s.fontSize, fontFamily: s.fontFamily, fontWeight: s.fontWeight,
      text: el.textContent?.trim().slice(0, 40),
    };
  };
  return {
    hero_h1: pick('h1', 'hero h1'),
    primary_btn: pick('a.bg-forest', 'primary button'),
    nav_book: pick('header a.bg-forest', 'nav book a call'),
    body: pick('body', 'body'),
    eyebrow: pick('.eyebrow', 'eyebrow'),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
