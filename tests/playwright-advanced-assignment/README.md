# WP E2E Utils Assignment

This repository contains end-to-end (E2E) tests for WooCommerce using Playwright. The assignment covers essential functionalities such as product management, coupon management, and user management.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Test Scenarios](#test-scenarios)
  - [Scenario 1: Product Management](#scenario-1-product-management)
  - [Scenario 2: Coupon Management](#scenario-2-coupon-management)
  - [Scenario 3: User Management](#scenario-3-user-management)
- [Running the Tests](#running-the-tests)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed
- **npm** installed
- Access to a WooCommerce store for testing purposes



## Configuration

To ensure the tests run smoothly, update the following configuration files:

### 1. Update `playwright.config.ts`

Set the `baseURL` to point to your automation site. 

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/',
    // other configurations
  },

```

### 2. Setup Environment Variables

Include the following details:

```env
USERNAME1
USERNAME2

ADMIN_USERNAME
ADMIN_PASSWORD
```

## Test Scenarios

### Scenario 1: Admin Login and Employee Search

- **Log in as an Admin user.**
- **Search for an employee using the Employee List feature.**

**Test File:** `001-login-and-emp-search.spec.ts`

---

### Scenario 2: Add a New Employee

- **Add a new employee with mandatory details.**
- **Verify that the employee was added successfully.**
- **Verify that the login credentials work by logging in with the newly created account.**

**Test File:** `002-add-new-employee.spec.ts`

---

### Scenario 3: Edit Employee Details

- **Update the added employee’s personal information.**
- **Assert that the changes are saved successfully.**

**Test File:** `003-edit-employee-details.spec.ts`

---

### Scenario 4: Edit Employee Details

- **Update the added employee’s personal information.**
- **Assert that the changes are saved successfully.**

**Test File:** `004-leave-workflow.spec.ts`

---

### Scenario 5: Edit Employee Details

- **Update the added employee’s personal information.**
- **Assert that the changes are saved successfully.**

**Test File:** `005-assign-supervisor.spec.ts`

---

### Scenario 6: Edit Employee Details

- **Update the added employee’s personal information.**
- **Assert that the changes are saved successfully.**

**Test File:** `006-logout-functionality.spec.ts`

## Running the Tests

From the root of the directory, run:

```bash
npx playwright test tests/playwright-advanced-assignment --config=playwright.spec.ts
```

## Project Structure

```plaintext
test-automation-using-playwright/
│
├── playwright.config.ts       # Playwright configuration file
├── .env                       # Environment variables file
├── pages/                     # Page Object Model (POM) classes
│   ├── DashboardPage.ts       # POM for managing Dashboard
│   ├── leavePage.ts           # POM for managing leaves
│   ├── loginPage.ts           # POM for managing Logins
│   ├── MyInfoPage.ts          # POM for managing profile
│   ├── PIMPage.ts             # POM for managing PIM
│
└── tests/                                        # Test specifications folder
    └── playwright-advanced-assignment/           # Assignment-specific test 

