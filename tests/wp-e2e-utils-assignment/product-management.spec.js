const { test } = require("@wordpress/e2e-test-utils-playwright");
const { ProductPage } = require("../../pages/productPage");
require("dotenv").config();

test.describe("PRODUCT MANAGEMENT: @assignment", () => {
  let mediaID;
  test.afterAll("Delte media", async ({ requestUtils }) => {
    await requestUtils.deleteMedia(mediaID);
  });
  test("Create a new product", async ({ page, admin, requestUtils }) => {
    const WP_USERNAME = process.env.WP_USERNAME ?? "";
    const productTitle =
      "Product" + Math.floor(100000 + Math.random() * 900000);
    let regularPrice = Math.floor(100 + Math.random() * 900);
    let salePrice = regularPrice - 10;
    const categoryName =
      "Category" + Math.floor(100000 + Math.random() * 900000);
    const uploadMediaEndPoint = await requestUtils.uploadMedia(
      "./uploads/img.jpg"
    );
    mediaID = uploadMediaEndPoint.id;
    console.log("media id", mediaID);

    const product = {
      title: productTitle,
      imageId: mediaID,
      regularPrice: regularPrice,
      salePrice: salePrice,
      category: categoryName,
    };
    // Create an instance of the ProductPage class
    const productPage = new ProductPage(page);
    // Navigate to the admin page and log in
    await productPage.gotoAdminPage();
    await productPage.loginAdmin(WP_USERNAME);

    await admin.createNewPost({ postType: "product" });

    // Create a new product
    await productPage.createProduct(product);
  });
});
