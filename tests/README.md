# Playwright Testing Framework

This directory contains end-to-end tests for the Nebula Logix website using Playwright.

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Playwright browsers (installed automatically)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
# or
npx playwright test --project=firefox
# or
npx playwright test --project=webkit
```

### Run specific test file
```bash
npx playwright test tests/e2e/specs/homepage.spec.ts
```

### Debug tests
```bash
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
