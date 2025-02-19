import { Page, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
const baseURL = process.env.BASE_URL || "";

export class LoginPage {
  constructor(private page: Page) {}

  async gotoLogin() {
    await this.page.goto(baseURL+"wp-login.php");
  }

  async loginUser(username: string, password: string) {

    await this.page.fill("#user_login", username);
    await this.page.fill("#user_pass", password);
    await this.page.click("#wp-submit");
  // Ensure login is successful
  await expect(this.page).toHaveURL(baseURL);

}
}