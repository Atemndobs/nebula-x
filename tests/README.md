# Playwright End-to-End Testing

This directory contains end-to-end tests for the Nebula Logix application using Playwright.

## Test Structure

```
tests/
├── e2e/
│   ├── config/             # Test configuration
│   │   └── test-setup.ts   # Test setup and fixtures
│   ├── pages/              # Page object models
│   │   ├── base-page.ts    # Base page class
│   │   ├── login-page.ts   # Login page interactions
│   │   └── dashboard-page.ts # Dashboard page interactions
│   ├── utils/              # Test utilities
│   │   └── test-utils.ts   # Common test utilities
│   ├── auth.spec.ts        # Authentication tests
│   ├── dashboard.spec.ts   # Dashboard tests
│   ├── home.spec.ts        # Home page tests
│   └── global-setup.ts     # Global test setup
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Playwright browsers (installed automatically)

### Installation

1. Install dependencies (from project root):
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Set up environment variables:
   - Copy `.env.test.example` to `.env.test`
   - Update the test credentials in `.env.test`

## Running Tests

### Run all tests
```bash
# From project root
npx playwright test
```

### Run tests in UI mode (Interactive)
```bash
npx playwright test --ui
```

### Run tests in headed mode (visible browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/e2e/auth.spec.ts
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
# or
npx playwright test --project=firefox
# or
npx playwright test --project=webkit
```

### Debug tests
```bash
# Debug in browser
export PWDEBUG=1
npx playwright test

# Debug with VSCode
# Add this to your launch.json:
{
  "name": "Debug Playwright Tests",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/playwright",
  "args": ["test", "--headed"],
  "console": "integratedTerminal"
}
```

## Test Reports

After running tests, you can find:
- HTML report: `test-results/html-report/index.html`
- Screenshots: `test-results/screenshots/`
- Test traces: `test-results/traces/`
- JUnit report: `test-results/junit-results.xml`

To open the HTML report:
```bash
npx playwright show-report
```

## Writing Tests

### Page Object Model
We use the Page Object Model (POM) pattern to organize tests:

1. **BasePage**: Contains common functionality
2. **Page Objects**: Each page has its own class with selectors and methods
3. **Test Files**: Import and use page objects to write tests

Example test:
```typescript
test('should login successfully', async ({ loginPage, dashboardPage }) => {
  await loginPage.navigate();
  await loginPage.login('test@example.com', 'password123');
  await dashboardPage.isCurrentPage();
  // Add assertions
});
```

## CI/CD Integration

For CI/CD, you can use the following commands:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npx playwright test
  env:
    CI: true
```

## Troubleshooting

- If tests are flaky, try increasing timeouts
- Use `test.slow()` for tests that take longer than expected
- Check the HTML report for detailed error information
- Use `--trace on` to capture execution traces:
  ```bash
  npx playwright test --trace on
  ```

## Best Practices

1. Keep tests independent and isolated
2. Use data-testid attributes for reliable selectors
3. Prefer role-based selectors over CSS/XPath
4. Use page objects to abstract implementation details
5. Write descriptive test names
6. Keep tests focused on a single feature/flow
npx playwright test --debug
```

## Test Structure

- `e2e/` - End-to-end tests
  - `pages/` - Page object models
  - `fixtures/` - Test data and mocks
  - `specs/` - Test specifications
- `component/` - Component tests (WIP)
- `utils/` - Test utilities
- `config/` - Test configurations

## Writing Tests

1. **Page Objects**: Create page objects in `e2e/pages/`
2. **Tests**: Write tests in `e2e/specs/`
3. **Fixtures**: Add test data in `e2e/fixtures/`

## Best Practices

- Use `data-testid` attributes for reliable element selection
- Keep tests independent and atomic
- Use descriptive test names
- Follow the Page Object Model pattern
- Add visual regression tests for critical paths

## CI/CD Integration

Tests run automatically on pull requests via GitHub Actions. See `.github/workflows/playwright.yml` for configuration.

## Reporting

Test reports are generated in the `test-results/` directory after each run.
