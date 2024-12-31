import { test } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { LoginPage } from "../../pages/loginPage";
import { PIMPage } from "../../pages/PIMPage";

test.describe("Employee Management Workflow Tests", () => {
  const empId1 = Math.floor(10000000 + Math.random() * 90000000).toString();
  const BASE_URL = process.env.BASE_URL ?? "";

  const username1 = process.env.USERNAME1 + empId1 || "";

  const user1Details: [string, string, string, string, string] = [
    username1,
    "User1Lastname",
    empId1,
    username1,
    username1,
  ];

  test("Create an employee", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);
    const adminUsername = process.env.ADMIN_USERNAME ?? "";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "";

    //Login admin user
    await loginPage.goto();
    await loginPage.login(adminUsername, adminPassword);

    //Add an employee
    await pimPage.navigateToPIM();
    await pimPage.addEmployee(...user1Details);
    await pimPage.logout();
  });

  test("Logout Admin user, login employee, and logout employee", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    //Login the created user and logout the same user
    await page.goto(BASE_URL);
    await loginPage.login(username1, username1);
    await loginPage.logout();
  });
});
