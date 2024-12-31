const { test } = require("@wordpress/e2e-test-utils-playwright");
const { CouponPage } = require("../../pages/couponsPage");
require("dotenv").config();

test.describe("COUPONS @assignment", () => {
  let coupon;
  const WP_USERNAME = process.env.WP_USERNAME ?? "";

  const username = "Customer" + Math.floor(100000 + Math.random() * 900000);
  const password = "Password" + Math.floor(100000 + Math.random() * 900000);
  const mailID =
    "customerMail" + Math.floor(100000 + Math.random() * 900000) + "@gmail.com";
  console.log("Generated email:", mailID);

  test.beforeAll("Create a customer user", async ({ requestUtils }) => {
    await requestUtils.createUser({
      username,
      password,
      email: mailID,
      role: ["Customer"],
    });
  });

  test("Create Coupon", async ({ page, admin }) => {
    const couponName = "coupon" + Math.floor(100000 + Math.random() * 900000);
    const couponDescription = "Discount through Playwright";
    coupon = {
      name: couponName,
      description: couponDescription,
      discount: "10",
    };
    // Login admin user:
    const couponPage = new CouponPage(page);
    await couponPage.gotoAdminPage();
    await couponPage.loginAdmin(WP_USERNAME);

    //Create a coupon
    await admin.createNewPost({ postType: "shop_coupon" });
    await couponPage.createCoupon(coupon);
    await page.goto(`wp-login.php?action=logout`);
    //Logout user
    if (await page.locator("text=Log Out").isVisible()) {
      await page.locator("text=Log Out").click();
    }
  });

  test("Verify successful login response and coupon usage", async ({
    page,
  }) => {
    const couponPage = new CouponPage(page);
    await page.goto("");
    //Login customer user
    await couponPage.loginCustomer(username, password);
    //Verify coupon
    await couponPage.verifyCouponByCustomer(coupon);
  });
});
