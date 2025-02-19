import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { LoginPage } from "../../pages/loginPage";
import { PIMPage } from "../../pages/PIMPage";

test.describe("Add and update employee", () => {
  const empId1 = Math.floor(10000000 + Math.random() * 90000000).toString();
  const username1 = process.env.USERNAME1 + empId1 || "";
  const user1Details: [string, string, string, string, string] = [
    username1,
    "User1Lastname",
    empId1,
    username1,
    username1,
  ];
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

  test("Add employee and create login credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    // Admin logs in
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

    // Navigate to PIM and add an employee
    await pimPage.navigateToPIM();
    await pimPage.addEmployee(...user1Details);

    // Admin logs out
    await loginPage.logout();

    console.log(
      `Employee ${username1} with ID ${empId1} created successfully.`
    );
  });

  test("Update employee details", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Employee logs in
    await loginPage.goto();
    await loginPage.login(username1, username1);

    // Navigate to 'My Info' and update gender
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
    await page.getByRole("link", { name: "My Info" }).click();
    await page
      .locator("label")
      .filter({ hasText: /^Male$/ })
      .locator("span")
      .click();
    await page
      .locator("form")
      .filter({ hasText: "Employee Full" })
      .getByRole("button")
      .click();

    // Verify success message and gender update
    await expect(page.getByText("Successfully Updated")).toBeVisible();
    await expect(page.locator(`//label[text()="Male"]`)).toBeChecked();
  });
});
