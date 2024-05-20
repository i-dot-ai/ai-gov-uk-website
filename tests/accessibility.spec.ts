import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const urlPrefix = 'http://localhost:8080/';
const pagesToTest = [
  '',
  'about',
  'join',
  'jobs/deputy-director-i-ai-strategy-and-business-engagement/',
  'projects',
  'projects/consultations',
  'projects/redbox-copilot',
  'projects/caddy',
  'projects/rapid',
  'projects/nhs-collaboration',
  'accessibility',
  'site-map'
];

for (let i = 0; i < pagesToTest.length; i++) {

  test(`Accessibility: ${pagesToTest[i]}`, async ({ page }) => {

    await page.goto(`${urlPrefix}${pagesToTest[i]}`);
    await page.waitForTimeout(1000); // allow animation to run (otherwise may get a false positive for colour contrast)

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

  });

}
