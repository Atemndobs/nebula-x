import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Page elements
  private readonly pageTitle = this.page.locator('h1').filter({ hasText: /Project Dashboard/i });
  // Customer ID is displayed in the format "NLX-2025-1858"
  private readonly customerId = this.page.locator('h1:has-text("Nebula Logix") + p');
  private readonly projectsTable = this.page.locator('table[aria-label="Projects table"]');

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}-${Date.now()}.png` });
  }
  
  // Helper method to access the page for testing
  getPageForTesting() {
    return this.page;
  }

  async navigate() {
    try {
      // Navigate to dashboard first
      await this.goto('/dashboard');
      await this.page.waitForLoadState('networkidle');
      
      // Wait for and click the drawer button
      const drawerButton = this.page.getByRole('button', { name: 'Open sidebar' });
      await drawerButton.waitFor({ state: 'visible', timeout: 10000 });
      await drawerButton.click();
      
      // Wait for navigation drawer to be fully expanded
      await this.page.waitForTimeout(500);
      
      // Click on Projects in the navigation
      const projectsLink = this.page.getByRole('link', { name: /projects/i });
      await projectsLink.waitFor({ state: 'visible', timeout: 5000 });
      await projectsLink.click();
      
      // Wait for navigation to complete
      await this.page.waitForURL('**/projects');
      
      // Wait for the main content to be visible
      await this.page.waitForSelector('h1:has-text("Project Dashboard")', { state: 'visible', timeout: 10000 });
      
      // Wait for customer ID to be visible
      await this.page.waitForSelector('h1:has-text("Nebula Logix") + p', { state: 'visible', timeout: 10000 });
      
      // Verify all required elements are visible
      await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
      await this.customerId.waitFor({ state: 'visible', timeout: 5000 });
      await this.projectsTable.waitFor({ state: 'visible', timeout: 5000 });
      
    } catch (error) {
      // Take a screenshot for debugging
      await this.takeScreenshot('navigation-error');
      console.error('Navigation failed:', error);
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
    const fullText = await this.customerId.textContent();
    // The customer ID is the entire text content of the element
    return fullText ? fullText.trim() : null;
  }
}
