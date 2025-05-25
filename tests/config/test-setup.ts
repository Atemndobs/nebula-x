import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../e2e/pages/home-page';

interface TestFixtures {
  homePage: HomePage;
  page: Page;
}

const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    await use(homePage);
  },
});

export { test, expect };
