import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { LoginPage } from "../../pages/loginPage";
import { PIMPage } from "../../pages/PIMPage";

test.describe("Add employee", () => {
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

    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await pimPage.navigateToPIM();
    await pimPage.addEmployee(...user1Details);

    await loginPage.logout();

    console.log(
      `Employee ${username1} with ID ${empId1} created successfully.`
    );
  });

  test("Verify created employee is able to login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username1, username1);

    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  });
});
