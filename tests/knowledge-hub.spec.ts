// TODO: Add tests for search functionality

import { test, expect } from '@playwright/test';

test('Knowledge Hub - Usecases filters', async ({ page }) => {

  await page.goto('/knowledge-hub/tools');

  const categoryCount = await page.evaluate(() => {
    const categories = [...document.querySelectorAll('.kh-card')].map((item) => {
      return item.getAttribute('data-category');
    });
    const analyseDataAndTextCount = categories.filter((category) => category?.includes('Analyse data and text'));
    return analyseDataAndTextCount.length;
  });

  await page.getByLabel('Task', { exact: true }).selectOption('Analyse data and text');
  expect(await page.locator('#filtered-count').innerText()).toEqual(categoryCount.toString());
  await page.getByLabel('Task', { exact: true }).selectOption('');
  expect(await page.locator('#filtered-count').innerText()).toEqual('all');

});
