// Arrange: Set up the test data and environment
//This script is generated by using playwright inspector, hence the credentials are made to be seen in the same file

import { test, expect } from "@playwright/test";

test("search employee by name", async ({ page }) => {
  const baseURL = process.env.BASE_URL ?? "";
  const adminCredentials = {
    username: "Admin",
    password: "admin123",
  };
  const searchQuery = "playwright";

  // Navigate to the login page
  await page.goto(baseURL);

  // Login as Admin
  await page.getByPlaceholder("Username").fill(adminCredentials.username);
  await page.getByPlaceholder("Password").fill(adminCredentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  // Navigate to PIM section and search for the employee
  await page.getByRole("link", { name: "PIM" }).click();
  await page.getByPlaceholder("Type for hints...").first().fill(searchQuery);
  await page
    .locator(`//span[contains(text(),"${searchQuery}")]`)
    .first()
    .click();
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("(1) Record Found")).toBeVisible();
});
