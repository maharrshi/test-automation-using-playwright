// EmployeeLeaveTest.ts
import { test } from "@playwright/test";
import dotenv from "dotenv";
import { LoginPage } from "../pages/loginPage";
import { PIMPage } from "../pages/PIMPage";
import { LeavePage } from "../pages/leavePage";

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const empId = Math.floor(10000000 + Math.random() * 90000000).toString();
const username = `${process.env.USERNAME1 ?? "User1"}${empId}`;
const BASE_URL = process.env.BASE_URL ?? "";

const userDetails: [string, string, string, string, string] = [
  username,
  "User1Lastname",
  empId,
  username,
  username,
];

test.describe("Leave Management Flow", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);
    const leavePage = new LeavePage(page);

    // Step 1: Admin Login
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

    // Step 2: Add Employee
    await pimPage.navigateToPIM();
    await pimPage.addEmployee(...userDetails);

    //Grant leave to the created employee:

    await leavePage.navigateToLeave(BASE_URL);
    await leavePage.assignLeave(username);

    //Step 3: Logout Admin
    await loginPage.logout();
  });

  test("Employee applies for leave and admin approves it", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const nextDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]; // Get next day in YYYY-MM-DD format
    const leaveType = "CAN - Vacation";

    // Employee Login and Leave Application
    await loginPage.goto();
    await loginPage.login(username, username);

    // Apply for leave
    await loginPage.navigateToLeavePage();
    await loginPage.applyForLeave(currentDate, nextDate, leaveType);

    // Log out Employee
    await loginPage.logout();

  });

});
test.describe("Leave Management Flow continued", () => {

test("Admin approves Leave", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leavePage = new LeavePage(page);

   //  Login admin user and Leave Approval
   await loginPage.goto();
await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);

await page.waitForSelector('(//img[@alt="profile picture"])[1]');

// Approve leave
await loginPage.navigateToLeavePage();
await loginPage.approveLeave(username);
await loginPage.logout();

//Login to the employee and verify the status to be as "Scheduled"
await loginPage.login(username, username);
await page.waitForTimeout(5000);

await leavePage.getLeaveStatus();
})
})
