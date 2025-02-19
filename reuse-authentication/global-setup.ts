import { Browser, chromium, Page } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

import dotenv from "dotenv";
dotenv.config();

const username = process.env.MANOJ_USERNAME || "";
const password = process.env.MANOJ_PASSWORD || "";

async function globalSetup() {
  let browser: Browser | null = null;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      httpCredentials: {
        username: process.env.HTTP_USN || "",
        password: process.env.HTTP_PWD || ""
      }
    });
    const page: Page = await context.newPage();
    const login = new LoginPage(page);

    await login.gotoLogin();
    await login.loginUser(username, password);

    // Save the state of the web page
    await page.context().storageState({ path: "./LoginAuth.json" });
  } catch (error) {
    console.error("Error during global setup:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default globalSetup;

/*
setup('authenticate user', async ({ page }) => {
  const username = process.env.MANOJ_USERNAME ?? "";
  const password = process.env.MANOJ_PASSWORD ?? "";

  // Go to the WordPress login page
  await page.goto("https://manoj-maharrshi.rt.gw/wp-login.php");

  // Enter username and password
  await page.fill("#user_login", username);
  await page.fill("#user_pass", password);
  await page.click("#wp-submit");

  // Ensure login is successful
  await expect(page).toHaveURL("https://manoj-maharrshi.rt.gw");

  // Save the authentication state to the mentioned auth path
  await page.context().storageState({ path: authFile });

});
*/
