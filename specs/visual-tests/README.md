# Visual Testing Using Playwright

## Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js** installed
- **npm** installed
- **Playwright** installed
- Visual Scripts are always being run using **Playwright Test Runner**

## Configuration
The configuration for visual tests is `playwright.config.ts`

## Test Scenarios

### Scenario 1: Admin Dashboard Verification
- Validate the visual appearance of the Admin Dashboard after logging in.
**Test File:** `visual-testing-assignment.spec.ts`

### Scenario 2: Employee Search Results
- Verify the UI consistency of the Employee List page after performing a search.
**Test File:** `visual-testing-assignment.spec.ts`

### Scenario 3: Employee Addition and Details Page
- Compare the UI of the “Add Employee” form and the “Employee Details” page after saving a new employee.
**Test File:** `visual-testing-assignment.spec.ts`

### Scenario 4: Supervisor Assignment Confirmation
- Verify the UI of the Supervisor Assignment section after assigning a supervisor to an employee.
**Test File:** `visual-testing-assignment-part2.spec.ts`

## Running the Tests

From the root of the directory, run the following command to create baseline screenshot

```bash
npx playwright test /visual-tests file-name --update-snapshots
```
Run the below command whenever you would like to test the scipts against the baseline screenshot

```bash
npx playwright test /visual-tests file-name
```