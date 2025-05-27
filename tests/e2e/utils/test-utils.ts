import { Page } from '@playwright/test';

/**
 * Wait for all network requests to complete
 * @param page Playwright page object
 */
export const waitForNetworkIdle = async (page: Page) => {
  await page.waitForLoadState('networkidle');
};

/**
 * Takes a screenshot of the current page and saves it with a timestamp
 * @param page Playwright page object
 * @param name Name for the screenshot file (without extension)
 */
export const takeScreenshot = async (page: Page, name: string) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    .replace('T', '_')
    .substring(0, 19);
  const screenshotPath = `test-results/screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
};

/**
 * Checks if an element is present on the page
 * @param page Playwright page object
 * @param selector CSS selector for the element
 * @returns boolean indicating if the element is present
 */
export const isElementPresent = async (page: Page, selector: string): Promise<boolean> => {
  return (await page.$(selector)) !== null;
};

/**
 * Scrolls an element into view
 * @param page Playwright page object
 * @param selector CSS selector for the element to scroll to
 */
export const scrollIntoView = async (page: Page, selector: string) => {
  await page.$eval(selector, (element) => {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

/**
 * Waits for a specific response from the server
 * @param page Playwright page object
 * @param urlPattern Pattern to match against response URLs
 * @param status HTTP status code to wait for (default: 200)
 * @returns The response object
 */
export const waitForResponse = async (
  page: Page,
  urlPattern: string | RegExp,
  status = 200
) => {
  return page.waitForResponse(
    (response) =>
      (typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url())) && response.status() === status
  );
};

/**
 * Fills a form field and triggers appropriate events
 * @param page Playwright page object
 * @param selector CSS selector for the input field
 * @param value Value to fill
 */
export const fillFormField = async (
  page: Page,
  selector: string,
  value: string
) => {
  await page.fill(selector, ''); // Clear the field first
  await page.fill(selector, value);
  await page.dispatchEvent(selector, 'blur');
};

/**
 * Generates a random string of specified length
 * @param length Length of the random string (default: 8)
 * @returns Random string
 */
export const generateRandomString = (length = 8): string => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Generates a random email address
 * @returns Random email address
 */
export const generateRandomEmail = (): string => {
  return `test-${Date.now()}@example.com`;
};
