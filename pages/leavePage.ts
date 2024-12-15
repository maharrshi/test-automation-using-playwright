import { Page, expect } from "@playwright/test";

export class LeavePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLogin(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async navigateToLeave(baseURL: string) {
    await this.page.goto(baseURL + "web/index.php/leave/assignLeave");
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async applyLeave(leaveComment: string) {
    await this.page.getByRole("link", { name: "Leave" }).click();
    await this.page.getByRole("link", { name: "Apply" }).click();
    await this.page.locator("form i").first().click();
    await this.page.getByRole("option", { name: "CAN - FMLA" }).click();
    await this.page.getByPlaceholder("yyyy-dd-mm").first().click();
    await this.page.getByText("12").click();
    await this.page.locator("textarea").fill(leaveComment);
    await this.page.getByRole("button", { name: "Apply" }).click();
  }

  async verifySuccessMessage() {
    await expect(this.page.getByText("Success", { exact: true })).toBeVisible();
  }

  async cancelLeave(leaveComment: string) {
    await this.page.getByRole("link", { name: "Leave List" }).click();
    await this.page
      .locator(
        `//div[text()="${leaveComment}"]//ancestor::div[contains(@class,"oxd-table-card")]//button`
      )
      .click();
    await this.page.getByText("Cancel Leave").click();
    await this.page.waitForTimeout(3000);
    await expect(
      this.page.locator(
        `//div[text()="${leaveComment}"]//ancestor::div[contains(@class,"oxd-table-card")]//button`
      )
    ).not.toBeVisible();
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

  async getLeaveStatus() {
    await this.page.getByRole("link", { name: "Leave" }).click();
    await expect(
      this.page.locator(`//div[contains(text(),"Scheduled")]`)
    ).toBeVisible();
  }
  async assignLeave(employeeName: string) {
    await this.page.getByLabel("Topbar Menu").getByText("Entitlements").click();
    await this.page.getByRole("menuitem", { name: "Add Entitlements" }).click();
    await this.page.getByPlaceholder("Type for hints...").click();
    await this.page.getByPlaceholder("Type for hints...").fill(employeeName);
    await this.page.getByText(employeeName).click();
    await this.page.locator("form i").first().click();
    await this.page.getByRole("option", { name: "CAN - Vacation" }).click();
    await this.page.getByRole("textbox").nth(2).click();
    await this.page.getByRole("textbox").nth(2).fill("10");
    await this.page.getByRole("button", { name: "Save" }).click();
    await this.page.getByText("Updating Entitlement").click();
    await this.page.getByRole("button", { name: "Confirm" }).click();
  }
  async navigateToLeavePage() {
    await this.page.getByRole("link", { name: "Leave" }).click();
  }
}
