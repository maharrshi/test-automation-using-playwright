const { test } = require("@wordpress/e2e-test-utils-playwright");
const { CustomerPage } = require("../../pages/customerPage");

test.describe("Scenario3: User Management @assignment", () => {
  let customer, orderId;
  const username = "Customer" + Math.floor(100000 + Math.random() * 900000);
  const password = "Password" + Math.floor(100000 + Math.random() * 900000);
  const adminUser = process.env.WP_USERNAME ?? "";
  const firstName = "firstName" + Math.floor(100000 + Math.random() * 900000);
  const lastName = "lastName";
  const address = "No 404 area 51";
  const city = "Kansas";
  const pincode = "560043";
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

  test("Customer creates an order", async ({ page }) => {
    customer = {
      mailId: mailID,
      firstName: firstName,
      LastName: lastName,
      Address: address,
      city: city,
      pincode: pincode,
    };
    const customerPage = new CustomerPage(page);
    //Logout admin user
    //await customerPage.logoutUser();
    await page.goto("");
    //Login  customer user
    await customerPage.loginCustomer(username, password);
    orderId = await customerPage.placeAnOrder(customer);
    //Logout customer and login admin user:
    await customerPage.logoutUser();
    await customerPage.loginAdmin(adminUser);
    await page.goto(`wp-admin/admin.php?page=wc-orders`);
    await customerPage.completeOrder(orderId);
  });
});
