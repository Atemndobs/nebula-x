import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Page elements
  private readonly pageTitle = this.page.locator('h1').filter({ hasText: /projects/i });
  private readonly customerId = this.page.locator('[data-testid="customer-id"]');
  private readonly projectsTable = this.page.locator('table[aria-label="Projects table"]');

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}-${Date.now()}.png` });
  }
  
  // Helper method to access the page for testing
  getPageForTesting() {
    return this.page;
  }

  async navigate() {
    await this.goto('/dashboard/projects');
    await this.page.waitForLoadState('networkidle');
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.projectsTable.waitFor({ state: 'visible' });
  }

  async isCurrentPage() {
    await expect(this.page).toHaveURL(/.*\/dashboard\/projects/);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.projectsTable).toBeVisible();
  }

  async getCustomerId(): Promise<string | null> {
    await this.customerId.waitFor({ state: 'visible' });
    return await this.customerId.textContent();
  }
}
