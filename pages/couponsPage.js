import { expect } from "@playwright/test";
require("dotenv").config();
export class CouponPage {
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
  async loginCustomer(username, password) {
    await this.page.getByLabel("Login").click();
    await this.page.getByLabel("Username or email address *").fill(username);
    await this.page.getByLabel("Password *Required").fill(password);
    await this.page.getByRole("button", { name: "Log in" }).click();
    await expect(this.page.getByText(username).first()).toBeVisible();
  }
  async verifyCouponByCustomer(coupon) {
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
    //Total Value before coupon is applied:
    const subTotalPrice = await this.page
      .locator(`//span[text()="Subtotal"]//following-sibling::span`)
      .innerText();
    console.log("subTotalPrice          ", subTotalPrice);
    //Apply the coupon:
    await this.page.getByRole("button", { name: "Add a coupon" }).click();
    await this.page.getByLabel("Enter code").click();
    await this.page.getByLabel("Enter code").fill(coupon.name);
    await this.page.getByRole("button", { name: "Apply" }).click();
    //Verify the coupon is applied:
    await expect(
      this.page.getByText(coupon.name, { exact: true })
    ).toBeVisible();
    let expectedPriceAfterDiscount = `₹${(
      parseFloat(subTotalPrice.replace(/[₹,]/g, "")) -
      parseFloat(coupon.discount)
    ).toFixed(2)}`;
    console.log(
      "expectedPriceAfterDiscount          ",
      expectedPriceAfterDiscount
    );

    const priceAfterDiscount = await this.page
      .locator(`//div[contains(@class,"totals-item__value")]//span`)
      .innerText();
    console.log("priceAfterDiscount          ", priceAfterDiscount);
    //Verify the  price after coupon is applied:
    expect(priceAfterDiscount).toEqual(expectedPriceAfterDiscount);
  }
  async gotoAdminPage() {
    await this.page.goto(`/wp-admin`);
  }

  async loginAdmin(username) {
    await this.page.getByLabel("Username or Email Address").click();
    await this.page.getByLabel("Username or Email Address").fill(username);
    await this.page.getByLabel("Password", { exact: true }).fill(username);
    await this.page.getByRole("button", { name: "Log In" }).click();
  }
}
