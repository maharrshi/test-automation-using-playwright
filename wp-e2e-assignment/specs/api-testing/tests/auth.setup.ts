import { test as setup , expect} from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();
import path from 'path';

const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate user', async ({ page }) => {
  const username = process.env.MANOJ_USERNAME ?? "";
  const password = process.env.MANOJ_PASSWORD ?? "";
/*
  // Set HTTP Basic Authentication credentials
  const httpAuth = {
    username: process.env.SITE_URL ?? "",
    password: process.env.SITE_URL ?? "",
  };

  // Create a new browser context with HTTP authentication
  const context = await browser.newContext({
    httpCredentials: httpAuth, // Apply HTTP Basic Authentication
  });

  // Create a new page in the context
  const page = await context.newPage();
*/
  // Go to the WordPress login page
  await page.goto("https://manoj-maharrshi.rt.gw/wp-login.php");

  await page.pause();

  // Enter username and password
  await page.fill("#user_login", username);
  await page.fill("#user_pass", password);
  await page.click("#wp-submit");

  // Ensure login is successful
  await expect(page).toHaveURL("https://manoj-maharrshi.rt.gw");

  // Save the authentication state 
  await page.context().storageState({ path: authFile });

  // Close the context after saving the state
});
