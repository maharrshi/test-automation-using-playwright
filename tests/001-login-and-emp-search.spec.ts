// Arrange: Set up the test data and environment
import { test, expect } from "@playwright/test";

test("search employee by name", async ({ page }) => {
  const baseURL =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
  const adminCredentials = {
    username: "Admin",
    password: "admin123",
  };
  const searchQuery = "playwright";

  // Act: Perform the actions
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

  // Assert: Verify the expected outcomes
  await expect(page.getByText("(1) Record Found")).toBeVisible();
});
