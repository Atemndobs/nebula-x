import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { BasePage } from '../pages/base-page';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

// Helper function to create page fixture with proper typing
const createPageFixture = <P extends BasePage>(
  PageClass: new (page: Page) => P
) => {
  return async (
    { page }: { page: Page },
    use: (pageInstance: P) => Promise<void>
  ) => {
    const pageInstance = new PageClass(page);
    await use(pageInstance);
  };
};

export const test = base.extend<PageFixtures>({
  loginPage: createPageFixture(LoginPage),
  dashboardPage: createPageFixture(DashboardPage),
});

export { expect } from '@playwright/test';
