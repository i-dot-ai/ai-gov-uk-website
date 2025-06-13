import { test, expect } from '@playwright/test';

const urlPrefix = 'http://localhost:8080';

// Run accessibility tests
test('Knowledge Hub - Usecases filter', async ({ page }) => {

  await page.goto(`${urlPrefix}/knowledge-hub/use-cases`);
  
  // Search functionality works
  await page.locator('summary:has-text("Search and filter")').click();
  await page.getByLabel('Search').fill('Redbox');
  await page.getByLabel('Search').press('Enter');
  expect(await page.locator('#filtered-count').innerText()).toEqual('1');
  await page.getByLabel('Search').fill('');
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

  // Select-box filters work
  const impactCount = await page.evaluate(() => {
    return [...document.querySelectorAll('[data-category="impact"]')].filter((item) => {
      return item.textContent?.includes('Cost Savings');
    }).length;
  });
  await page.getByLabel('Impact').selectOption('Cost Savings');
  expect(await page.locator('#filtered-count').innerText()).toEqual(impactCount.toString());
  await page.getByLabel('Impact').selectOption('');
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

});
