# API Testing

This repository contains automated test scripts for API testing using Playwright. A local hosted site is used as part of this API testing. To login to the local wordpress site, username and Application password is set in the .env file.

## Repository Structure

1. **Test Scripts **
   - All test scripts are organized under the `/tests` folder.
   - Scripts can be found with the name as `api-test-example.spec.ts`

2. **Credentials**
    - Base url, username and application password is stored in the `.env` file
  
3. **Data Driven Testing**
   - `testData.json` file contains data that is being passed to test files as payload

   

## Configuration

- The tests are configured  in the `playwright.config.ts` where the authorisation and headers can be modified.

## How to Run the Tests

1. Ensure all dependencies are installed by running:
   npm install

2. Install playwright browsers
   npx playwright install

2. Execute the tests using the following command:
   `npx playwright test `

## Additional notes

- For troubleshooting or modifying test configurations, review the playwright.config.ts file.
