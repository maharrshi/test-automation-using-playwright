import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals such as `process`
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.node, // Ensure Node.js globals are available here as well
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node, // Include Node.js globals for TypeScript files
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
