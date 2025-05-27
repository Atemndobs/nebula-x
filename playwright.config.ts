import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

// Directory for test artifacts
const testResultsDir = path.join(__dirname, 'test-results');
const testScreenshotsDir = path.join(testResultsDir, 'screenshots');
const testTracesDir = path.join(testResultsDir, 'traces');

// Create test directories if they don't exist
import { existsSync, mkdirSync } from 'fs';
if (!existsSync(testScreenshotsDir)) mkdirSync(testScreenshotsDir, { recursive: true });
if (!existsSync(testTracesDir)) mkdirSync(testTracesDir, { recursive: true });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Look for test files in the "tests/e2e" directory
  testDir: './tests/e2e',
  
  // Global setup runs before all tests
  globalSetup: './tests/e2e/global-setup',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : '50%',
  
  // Reporters
  reporter: [
    ['html', { 
      open: process.env.CI ? 'never' : 'on-failure',
      outputFolder: path.join(__dirname, 'playwright-report')
    }],
    ['list'],
    ['junit', { outputFile: path.join(testResultsDir, 'junit-results.xml') }]
  ],
  
  // Global timeout for each test
  timeout: 30 * 1000,
  
  // Expect timeout
  expect: {
    timeout: 10 * 1000
  },
  
  // Shared settings for all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Capture screenshot on test failure
    screenshot: 'only-on-failure',
    
    // Record video on test failure
    video: 'on-first-retry',
    
    // Storage state for authentication
    storageState: 'playwright/.auth/user.json',
    
    // Viewport settings
    viewport: { width: 1920, height: 1080 },
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Browser context options
    contextOptions: {
      recordVideo: {
        dir: testTracesDir,
        size: { width: 1280, height: 720 }
      }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Uncomment to test in other browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },


    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
