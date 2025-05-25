import { Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {}

  async navigate(path = '') {
    await this.page.goto(`http://localhost:5174${path}`);
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}-${Date.now()}.png` });
  }
}
