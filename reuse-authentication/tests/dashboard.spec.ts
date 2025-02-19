import { test, expect } from "@playwright/test";
// This test will be using the storage state 
test("Dashboard ", async ({ page }) => {
  await page.goto("/wp-admin");
  await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();
});
