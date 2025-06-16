import { test, expect } from '@playwright/test';

const urlPrefix = 'http://localhost:8080';


test('Knowledge Hub - Usecases filters', async ({ page }) => {

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


test('Knowledge Hub - Prompts filters', async ({ page }) => {

  await page.goto(`${urlPrefix}/knowledge-hub/prompts`);
  
  // Search functionality works
  await page.locator('summary:has-text("Search and filter")').click();
  await page.getByLabel('Search', { exact: true }).fill('Explain like');
  await page.getByLabel('Search', { exact: true }).press('Enter');
  expect(await page.locator('#filtered-count').innerText()).toEqual('1');
  await page.getByLabel('Search', { exact: true }).fill('');
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

  // Tag filters work
  const productivityCount = await page.evaluate(() => {
    return [...document.querySelectorAll('.js-prompt__tag')].filter((item) => {
      return item.textContent === 'Productivity';
    }).length;
  });
  await page.getByLabel('Productivity').check();
  expect(await page.locator('#filtered-count').innerText()).toEqual(productivityCount.toString());
  await page.getByLabel('Productivity').uncheck();
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

});
