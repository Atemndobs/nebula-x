import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  // Form elements
  private readonly emailInput = this.page.getByLabel('Email address');
  private readonly passwordInput = this.page.getByLabel('Password');
  private readonly submitButton = this.page.locator('button[type="submit"]').filter({ hasText: 'Sign in' });
  private readonly errorMessage = this.page.locator('.text-red-700');
  private readonly form = this.page.locator('form');

  async navigate() {
    await this.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    // Wait for the form to be visible and interactive
    await this.form.waitFor({ state: 'visible' });
    
    // Fill in the form
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    // Wait for the submit button to be enabled
    await this.submitButton.waitFor({ state: 'visible' });
    
    // Click the button and wait for navigation or error
    await Promise.all([
      this.page.waitForURL('**/dashboard', { timeout: 10000 }),
      this.page.waitForSelector('.text-red-700', { timeout: 10000 }).catch(() => null),
      this.submitButton.click()
    ]);
    
    // Wait for either the dashboard or an error to appear
    try {
      await this.page.waitForURL('**/dashboard', { timeout: 5000 });
    } catch (_error) {
      // If navigation to dashboard fails, wait for error message
      await this.page.waitForSelector('.text-red-700', { timeout: 5000 });
    }
  }

  async assertErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async isCurrentPage() {
    await expect(this.page).toHaveURL(/.*\/login/);
    await expect(this.form).toBeVisible();
  }
}
