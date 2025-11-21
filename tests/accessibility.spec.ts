import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = require('../_site/site-map.js');

for (let pageToTest of pagesToTest) {

  // Run accessibility tests
  test(`Accessibility - ${pageToTest}`, async ({ page }) => {

    await page.goto(pageToTest);
    
    // Axe tests
    const accessibilityScanResults = await new AxeBuilder({page}).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check any links that open in new tab contain "opens in a new tab" text
    const links = await page.$$('a');
    for (let link of links) {
      const target = await link.getAttribute('target');
      if (target === '_blank') {
        const textContent = await link.textContent();
        expect(textContent).toContain('opens in a new tab');
      }
    }

  });

}