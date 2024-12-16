# Test Automation Using Playwright

This repository contains automated test scripts for Playwright assignments, providing a structured approach to testing with the following features:

## Repository Structure

1. **Test Scripts**
   - All test scripts are organized under the `/tests` folder.
   - The files are sequentially numbered to correspond with the test cases outlined in the LMS.

2. **Page Object Model (POM)**
   - The project follows the Page Object Model design pattern.
   - Page-specific classes and methods are located in the `/pages` folder.

## Configuration

- The tests are configured to run in **headless mode**, as specified in the `playwright.config.ts` file.

## How to Run the Tests

1. Ensure all dependencies are installed by running:
   npm install

2. Execute the tests using the following command:
   npx playwright test
## Additional notes

- Refer to the LMS for detailed descriptions of each test case.
- For troubleshooting or modifying test configurations, review the playwright.config.ts file.
- for the leave workflow, additionally assigning the leave the created employee is implemented which is currently not present in the test case
