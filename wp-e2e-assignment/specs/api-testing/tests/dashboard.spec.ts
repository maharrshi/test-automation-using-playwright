import { test, expect } from '@playwright/test';

test('Verify WordPress dashboard with reused auth', async ({ page }) => {
  await page.goto('https://manoj-maharrshi.rt.gw/wp-admin/');

  // Verify if the dashboard is accessible (or any other checks)
  await expect(page.locator('#wpadminbar')).toBeVisible();
});
