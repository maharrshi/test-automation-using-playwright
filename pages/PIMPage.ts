import { Page, expect } from "@playwright/test";

export class PIMPage {
  constructor(private page: Page) {}

  async navigateToPIM() {
    await this.page.getByRole("link", { name: "PIM" }).click();
  }

  async addEmployee(
    firstName: string,
    lastName: string,
    employeeId: string,
    username: string,
    password: string
  ) {
    await this.page.getByRole("link", { name: "Add Employee" }).click();
    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);
    await this.page
      .locator("form")
      .getByRole("textbox")
      .nth(4)
      .fill(employeeId);
    await this.page.locator("form span").last().click();
    await this.page
      .locator(
        `//label[text()="Username"]//ancestor::div[contains(@class,"oxd-input-field-bottom")]//input`
      )
      .fill(username);
    await this.page.locator('input[type="password"]').first().fill(password);
    await this.page.locator('input[type="password"]').nth(1).fill(password);
    await this.page.getByRole("button", { name: "Save" }).click();
    // Verify employee is added:
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }

  async assignSupervisor(supervisorName: string) {
    await this.page.getByRole("link", { name: "Report-to" }).click();
    await this.page
      .locator("div")
      .filter({ hasText: /^Assigned Supervisors/ })
      .getByRole("button")
      .click();
    await this.page.getByPlaceholder("Type for hints...").fill(supervisorName);
    await this.page.getByText(`${supervisorName}`).click();
    await this.page.locator("form i").click();
    await this.page
      .getByRole("option", { name: "Direct", exact: true })
      .click();
    await this.page.getByRole("button", { name: "Save" }).click();
    // Verify supervisor is assigned:
    await expect(this.page.getByText("Successfully Saved")).toBeVisible();
  }
  async logout() {
    await this.page.locator('//img[@alt="profile picture"]').first().click();
    await this.page.click("text=Logout");
    //Verify the login page is visible
    await expect(this.page.locator('//h5[text()="Login"]')).toBeVisible();
  }
}
