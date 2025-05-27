import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Page elements
  private readonly pageTitle = this.page.locator('h1').filter({ hasText: /Project Dashboard/i });
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
    // Navigate to dashboard first
    await this.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
    
    try {
      // Wait for and click the drawer button
      const drawerButton = this.page.getByRole('button', { name: 'Open sidebar' });
      await drawerButton.waitFor({ state: 'visible', timeout: 10000 });
      await drawerButton.click();
      
      // Click on Projects in the navigation
      const projectsLink = this.page.locator('a[href="/projects"]');
      await projectsLink.waitFor({ state: 'visible', timeout: 5000 });
      await projectsLink.click();
      
      // Wait for navigation and elements with increased timeout
      await this.page.waitForURL(/.*\/projects/);
      await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
      await this.customerId.waitFor({ state: 'visible', timeout: 10000 });
      await this.projectsTable.waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      // Take a screenshot for debugging
      await this.takeScreenshot('navigation-error');
      throw error;
    }
  }

  async isCurrentPage() {
    await expect(this.page).toHaveURL(/.*\/projects/);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.projectsTable).toBeVisible();
  }

  async getCustomerId(): Promise<string | null> {
    await this.customerId.waitFor({ state: 'visible' });
    return await this.customerId.textContent();
  }
}
