// TODO: Add tests for search functionality

import { test, expect } from '@playwright/test';

test('Knowledge Hub - Usecases filters', async ({ page }) => {

  await page.goto('/knowledge-hub/use-cases');
  
  await page.locator('summary:has-text("Filter")').click();

  const impactCount = await page.evaluate(() => {
    const impacts = [...document.querySelectorAll('[data-card-type="use-case"]')].map((item) => {
      return item.getAttribute('data-impact');
    });
    const costSavingsCount = impacts.filter((impact) => impact?.includes('Cost Savings'));
    return costSavingsCount.length;
  });

  await page.getByLabel('Impact').selectOption('Cost Savings');
  expect(await page.locator('#filtered-count').innerText()).toEqual(impactCount.toString());
  await page.getByLabel('Impact').selectOption('');
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

});
