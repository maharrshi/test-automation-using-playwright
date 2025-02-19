import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
const baseURL = process.env.BASE_URL || "";
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(baseURL);
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
  async logout() {
    await this.page.locator('//img[@alt="profile picture"]').first().click();
    await this.page.waitForTimeout(2000);
    const profilePictureLocator = this.page.locator("text=Logout");
    if (!(await profilePictureLocator.isVisible())) {
      await this.page.locator('//img[@alt="profile picture"]').first().click();
    }
    await this.page.click("text=Logout");
    await this.page.waitForLoadState("networkidle");
    //Verify the login page is visible
    await expect(
      this.page.getByRole("heading", { name: "Login" })
    ).toBeVisible();
  }
  async navigateToLeavePage() {
    await this.page.goto(baseURL + "web/index.php/leave/viewLeaveList");
  }
  async approveLeave(employeeUsername: string) {
    //Expect leave request is visible:
    await expect(this.page.getByText(employeeUsername)).toBeVisible();

    //Click on approve:
    await this.page
      .locator(
        `//div[contains(text(),"${employeeUsername}")]//ancestor::div[contains(@class,"table-card")]//button`
      )
      .first()
      .click();

    //Verify the leave approval
    await expect(this.page.getByText("Successfully Updated")).toBeVisible();
  }
  async applyForLeave(startDate: string, endDate: string, leaveType: string) {
    await this.page.getByRole("link", { name: "Apply" }).click();
    await this.page
      .locator(`//input[@placeholder="yyyy-dd-mm"]`)
      .last()
      .fill(endDate);
    await this.page
      .locator(`//input[@placeholder="yyyy-dd-mm"]`)
      .first()
      .fill(startDate);
    await this.page.getByText("-- Select --").click();
    await this.page.getByRole("option", { name: `${leaveType}` }).click();
    await this.page.getByRole("button", { name: "Apply" }).click();
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }
}
