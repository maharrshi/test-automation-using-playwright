# Test Automation Using Playwright

This repository contains automated test scripts for Playwright assignments, providing a structured approach to testing with the following features:

## Repository Structure

1. **Test Scripts **
   - All test scripts are organized under the `/specs` folder.
   - Scripts are placed in two folders. One folder contains the test files related to playwright Advanced under `/tests/playwright-advanced` and the other file contains test files that have used wordpress e2e-utils `/specs/wp-e2e-utils-assignment`

2. **Page Object Model (POM)**
   - The project follows the Page Object Model design pattern.
   - Page-specific classes and methods are located in the `/pages` folder.

3. **Credentials**
    - Base url and the user credentials are stored in the `.env` file

## Configuration

- The tests are configured to run in **headless mode**, as specified in the `playwright.config.ts` and `playwright-2.config.ts`
- The repository contains two config files as each of them represents configuration for different projects.

## How to Run the Tests

1. Ensure all dependencies are installed by running:
   npm install

2. Install playwright browsers
   npx playwright install

2. Execute the tests using the following command:
   `npx playwright test tests/project-name --config=respective-config-file`

## Additional notes


- For troubleshooting or modifying test configurations, review the playwright.config.ts file.


