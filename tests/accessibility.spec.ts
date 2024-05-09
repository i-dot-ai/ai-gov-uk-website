import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const urlPrefix = 'http://localhost:8080/';


test(`Accessibility`, async ({ page }) => {

  // Collect all pages from sitemap
  let pagesToTest = [''];
  await page.goto(`${urlPrefix}site-map`);
  const links = await page.$$('a');
  for (let link of links) {
    const url = (await link.getAttribute('href'))?.replace('/', '');
    if (url && !url.includes('mailto') && !url.startsWith('#') && !pagesToTest.includes(url)) {
      pagesToTest.push(url);
    }
  }

  // Run accessibility tests
  for (let pageToTest of pagesToTest) {

    await page.goto(`${urlPrefix}${pageToTest}`);
    await page.waitForTimeout(1000); // allow animation to run (otherwise may get a false positive for colour contrast)
    console.log(`Testing accessibility for ${pageToTest}`);
    
    // Axe tests
    const accessibilityScanResults = await new AxeBuilder({page}).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check any links that open in new tab contain "opens in new tab" text
    const links = await page.$$('a');
    for (let link of links) {
      const target = await link.getAttribute('target');
      if (target === '_blank') {
        const textContent = await link.textContent();
        expect(textContent).toContain('opens in new tab');
      }
    }

  }

});
