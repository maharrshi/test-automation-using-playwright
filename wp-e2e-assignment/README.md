# Test Automation Using Wordpress e2e package

This repository contains automated test scripts for Playwright assignments and visual testing, providing a structured approach to testing with the following features:

## Repository Structure

1. **Test Scripts **
   - All test scripts are organized under the `/specs` folder.
   - Scripts are placed in under the `wp-e2e-scripts` folders. 

2. **Page Object Model (POM)**
   - The project follows the Page Object Model design pattern.
   - Page-specific classes and methods are located in the `/pages` folder.

3. **Credentials**
    - Base url and the user credentials are stored in the `.env` file

## Configuration

- The tests are configured to run in **headless mode**, as specified in the `playwright.config.ts`

## Test Scenarios for wordpress e2e utils Assignment

### Scenario 1: Coupon Management

- Create different types of coupons (percentage, fixed amount)
- Apply coupons during checkout
- Verify discount calculations

**Test File:** `product-management.spec.ts`

---

### Scenario 2: Product Management

- Product Management
- Create a simple product.
- Add product categories and tags.
- Upload product images
- Set pricing and inventory
- Publish and verify product visibility

**Test File:** `product-management.spec.ts`

---

### Scenario 3: User Management

- Create a customer user
- Customer places order
- Admin/Store manager reviews the order

**Test File:** `user-management.spec.ts`

---

## How to Run the Tests

1. Ensure all dependencies are installed by running:
   npm install

2. Install playwright browsers
   npx playwright install

2. Execute the tests using the following command:
   `npx playwright test specs/file_name`

## Additional notes


- For troubleshooting or modifying test configurations, review the playwright.config.ts file.


