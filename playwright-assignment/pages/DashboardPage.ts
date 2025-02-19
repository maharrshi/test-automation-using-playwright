// DashboardPage.ts
import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
  }

  async navigateToLeavePage() {
    await this.page.getByRole("link", { name: "Leave" }).click();
  }
}
