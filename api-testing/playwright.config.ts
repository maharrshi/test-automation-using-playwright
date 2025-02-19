import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  reporter: "html",
  use: {
    baseURL: process.env.WP_BASE_URL ?? '',
    //Authorisation though Application Password
    extraHTTPHeaders: {
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.HTTP_AUTH_USER ?? ""}:${
          process.env.HTTP_AUTH_PASS ?? ""
        }`
      ).toString("base64")}`,
    },
  },
};

export default config;
