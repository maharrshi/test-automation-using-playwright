import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    globalSetup: './global-setup',
    testDir: './tests',
   
    outputDir: 'test-results',

    /* Shared settings for all the projects below.*/
    use: {
        actionTimeout: 0,
        baseURL: 'https://manoj-maharrshi.rt.gw/',
        trace: 'on-first-retry',
        storageState: './LoginAuth.json',
        /* Set headless */
        headless: false,
        httpCredentials: {
          username: process.env.HTTP_USN || "",
          password: process.env.HTTP_PWD || ""
        }

    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

         {
           name: 'firefox',
           use: {
             ...devices['Desktop Firefox'],
           },
         },

         {
           name: 'webkit',
           use: {
             ...devices['Desktop Safari'],
           },
         },

        /* Test against mobile viewports. */
         {
           name: 'Mobile Chrome',
           testMatch: /.*TestMatch.spec.ts/,
           use: {
             ...devices['Pixel 7'],
           },
         },
         {
           name: 'Mobile Safari',
           use: {
             ...devices['iPhone 14'],
           },
         },

    ],

};

export default config;