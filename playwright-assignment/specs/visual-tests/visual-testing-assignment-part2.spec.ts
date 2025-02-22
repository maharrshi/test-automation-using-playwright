import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { LoginPage } from "../../pages/loginPage";
import { PIMPage } from "../../pages/PIMPage";
import { MyInfoPage } from "../../pages/MyInfoPage";

test.describe("Visual Assignment Continuation", () => {
  const empId1 = Math.floor(10000000 + Math.random() * 90000000).toString();
  const empId2 = Math.floor(10000000 + Math.random() * 90000000).toString();

  const username1 = process.env.USERNAME1 + empId1 || "";
  const username2 = process.env.USERNAME2 + empId2 || "";
  const supervisorUsername = process.env.USERNAME1 || "";

  const user1Details: [string, string, string, string, string] = [
    username1,
    "User1Lastname",
    empId1,
    username1,
    username1,
  ];
  const user2Details: [string, string, string, string, string] = [
    username2,
    "User2Lastname",
    empId2,
    username2,
    username2,
  ];
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

  test("Create two employees and assign supervisor", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

    // Step 2: Add Employee 1
    await pimPage.navigateToPIM();
    await pimPage.addEmployee(...user1Details);

    // Step 3: Add Employee 2
    await pimPage.addEmployee(...user2Details);

    // Step 4: Assign employee1 as Supervisor to employee 2
    await pimPage.assignSupervisor(username1);

    //Make sure there is no loader on the page
    await pimPage.waitForSpinnerToDisappear();

    //Wait for supervisor assignment to be visible in the table
    await page.waitForSelector('//div[text()="Direct"]');
    
    await expect(page.locator('//div[text()="Direct"]')).toBeVisible({
      timeout: 45000,
    });

    // Locator to include the area for visual Testing
    const selectedArea = page.locator(".oxd-layout-context");

    // Perform visual testing while masking the specific heading inside the selected area
    await expect(selectedArea).toHaveScreenshot({
      mask: [
        selectedArea.locator(
          '//div[contains(@class,"edit-employee-name")]//h6'
        ),
      ], // Mask only within the selected area
    });
  });
});
