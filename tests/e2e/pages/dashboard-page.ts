import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  // Dashboard elements
  private readonly pageTitle = this.page.locator('h1').filter({ hasText: 'Resources Dashboard' }).first();
  private readonly menuButton = this.page.locator('button[aria-label="Open menu"]');
  private readonly logoutButton = this.page.getByRole('button', { name: /sign out/i });
  private readonly userGreeting = this.page.locator('p:has-text("Welcome back")');
  private readonly dashboardContent = this.page.locator('main');

  async navigate() {
    await this.goto('/dashboard');
    await this.page.waitForLoadState('networkidle');
    await this.dashboardContent.waitFor({ state: 'visible' });
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  async isCurrentPage() {
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await this.dashboardContent.waitFor({ state: 'visible' });
    await expect(this.pageTitle).toBeVisible();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
    await this.page.waitForURL('**/login');
  }

  async getUserEmail() {
    const greeting = await this.userGreeting.textContent();
    return greeting?.match(/Welcome back, (\w+)/)?.[1] || null;
  }
}
