import { expect } from "@playwright/test";
require("dotenv").config();
export class CustomerPage {
  constructor(page) {
    this.page = page;
  }

  // This function is used create a Product
  async createCoupon(coupon) {
    //Enter coupon name
    await this.page.getByLabel("Coupon code").click();
    await this.page.getByLabel("Coupon code").fill(coupon.name);

    //Enter description for the coupon
    await this.page.getByPlaceholder("Description (optional)").click();
    await this.page
      .getByPlaceholder("Description (optional)")
      .fill(coupon.description);

    //Selct Discount Type
    await this.page.getByLabel("Discount type").selectOption("fixed_cart");
    //Enter the discount amount
    await this.page.getByPlaceholder("0").fill(coupon.discount);
    //Publish the coupon
    await this.page
      .getByRole("button", { name: "Publish", exact: true })
      .click();

    //Verify the coupon is created
    await expect(this.page.getByText("Coupon updated.")).toBeVisible();
  }
  //Login customer to the shop
  async loginCustomer(username, password) {
    await this.page.getByLabel("Login").click();
    await this.page.getByLabel("Username or email address *").fill(username);
    await this.page.getByLabel("Password *Required").fill(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
    await expect(this.page.getByText(username).first()).toBeVisible();
  }
  //Login Admin user to the site
  async loginAdmin(username) {
    await this.page.getByLabel("Username or Email Address").click();
    await this.page.getByLabel("Username or Email Address").fill(username);
    await this.page.getByLabel("Password", { exact: true }).fill(username);
    await this.page.getByRole("button", { name: "Log In" }).click();
  }
  // Place an order
  async placeAnOrder(customer) {
    await this.page.goto(`/shop`);

    //Add two items to cart:
    await this.page.locator(`//ul//li[1]//span[text()="Add to cart"]`).click();
    await this.page.locator(`//ul//li[2]//span[text()="Add to cart"]`).click();

    //Verify two items in cart shown as a symbol
    await expect(
      this.page.locator(`//button[@aria-label="2 items in cart"]`)
    ).toBeVisible();
    //Goto cart
    await this.page.getByLabel("items in cart").click();
    await this.page.getByRole("link", { name: "Go to checkout" }).click();

    //Fill mandatory customer details to place an order
    await this.page.getByLabel("Email address").click();
    await this.page.getByLabel("Email address").fill(customer.mailId);
    await this.page.getByLabel("First name").click();
    await this.page.getByLabel("First name").fill(customer.firstName);
    await this.page.getByText("Last name", { exact: true }).click();
    await this.page.getByLabel("Last name").fill(customer.LastName);
    await this.page.getByLabel("Address", { exact: true }).click();
    await this.page
      .getByLabel("Address", { exact: true })
      .fill(customer.Address);
    await this.page.getByLabel("City").click();
    await this.page.getByLabel("City").fill(customer.city);
    await this.page.getByLabel("PIN Code").click();
    await this.page.getByLabel("PIN Code").fill(customer.pincode);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole("button", { name: "Place Order" }).click();

    //Fetch the order Id:
    const orderId = await this.page
      .locator(`//li[1][contains(@class,"summary-list")]//span`)
      .last()
      .innerText();
    console.log("ORDER ID FETCHED IS :", orderId);

    return orderId;
  }
  //Log out an user
  async logoutUser() {
    await this.page.goto(`wp-login.php?action=logout`);

    if (await this.page.locator("text=Log Out").isVisible()) {
      await this.page.locator("text=Log Out").click();
    }
  }
  // Admin completes the order from dashboard
  async completeOrder(orderNumber) {
    await this.page.locator(`#cb-select-${orderNumber}`).check();
    await this.page
      .locator("#bulk-action-selector-top")
      .selectOption("mark_completed");
    await this.page.locator("#doaction").click();
    await expect(
      this.page.locator(
        `//tr[@id="order-${orderNumber}"]//td[@data-colname="Status"]//span`
      )
    ).toContainText("Completed");
  }
}
