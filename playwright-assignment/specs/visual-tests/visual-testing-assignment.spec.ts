import { test, expect, Page } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("Visual Testing Assignment Part-1", () => {
  let page: Page;
  const LOGIN_URL = process.env.BASE_URL ?? "";
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

  test.beforeAll(async ({ browser }) => {

    // Launch a new browser page
    page = await browser.newPage();
    await page.goto(LOGIN_URL);
    
    // Enter username and password
    await page.fill('//input[@placeholder="Username"]', ADMIN_USERNAME);
    await page.fill('//input[@placeholder="Password"]', ADMIN_PASSWORD);

    // Click the login button
    await page.click('//button[@type="submit"]');

    // Wait for the Dashboard page to load
    await page.waitForSelector('//span[text()="Dashboard"]');
  });

  test("Admin Dashboard Verification", async () => {
    await page.waitForTimeout(3000);
    // Take a screenshot and compare with the baseline
    expect(await page.screenshot()).toMatchSnapshot("admin-dashboard.png");
  });

  test("Employee Search Results", async () => {
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList"
    );
    await page.waitForSelector(
      `(//input[@placeholder="Type for hints..."])[1]`
    );

    await page
      .locator("(//input[@placeholder='Type for hints...'])[1]")
      .fill("Adam");
    await page.locator('button[type="submit"]').click(); // Click the submit button

    await page.waitForTimeout(5000);
    //Take screenshot and compare with baseline:
    expect(await page.screenshot()).toMatchSnapshot("employee-search.png");

    //UI Consistency:

    const region1 = await page.locator(".oxd-topbar-header"); // Header Section
    const region2 = await page.locator('//button[@type="submit"]'); // Example: Employee table

    expect(await region1.screenshot()).toMatchSnapshot(
      "region1-topbar-header.png"
    );
    expect(await region2.screenshot()).toMatchSnapshot(
      "region2-employeeSeach-SearchButton.png"
    );
  });

  test("Employee Addition and Details Page", async () => {
    const addEmployeeForm =
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee";
    await page.goto(addEmployeeForm);

    // Take Screenshot of "Add Employee" form
    expect
      .soft(await page.screenshot())
      .toMatchSnapshot("add-employee-form.png");

    // Fill first name
    await page.locator('//input[@name="firstName"]').fill("playwright UI Test");

    // Fill last name
    await page.locator('//input[@name="lastName"]').fill("inspector");

    // Save
    await page.locator('//button[@type="submit"]').click();

    // Wait for the URL to change to the expected pattern
    await page.waitForURL(
      /web\/index\.php\/pim\/viewPersonalDetails\/empNumber/
    );

    // Wait for the loading to complete
    await page.waitForSelector(".oxd-loading-spinner", { state: "hidden" });

    //Verify the dashboard is visible to ensure no blank page is shown.
    await page.waitForSelector('//span[text()="Dashboard"]');
    await page.waitForTimeout(3500);

    // Compare the screenshot with the expected snapshot
    expect(await page.screenshot()).toMatchSnapshot(
      "employee-details-page.png"
    );
  });
});
