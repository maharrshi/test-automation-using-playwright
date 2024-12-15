import { Page, expect } from "@playwright/test";

export class MyInfoPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the "My Info" page.
   */
  async gotoMyInfo() {
    // Navigate to the My Info page
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewMyDetails"
    );

    await this.page.waitForTimeout(2500);
  }

  async getSupervisorDetails(supervisorName: string) {
    //Go to "Reports to" page:
    await this.page.getByRole("link", { name: "Report-to" }).click();
    await expect(
      this.page.locator(
        `//div[@role="cell"]//div[contains(text(),"${supervisorName}")]`
      )
    ).toBeVisible();
  }
}
