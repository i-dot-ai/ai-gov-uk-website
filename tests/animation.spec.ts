import { test, expect } from '@playwright/test';
import { assert } from 'console';

test.use({ javaScriptEnabled: false });
test(`Content is visible if no javascript`, async ({ page }) => {
  await page.goto('http://localhost:8080/');
  const content = await page.$('[data-aos]');
  let opacity = '0';
  if (content) {
    opacity = await page.evaluate(el => window.getComputedStyle(el).opacity, content);
  }
  await expect(opacity).toBe('1');
});
