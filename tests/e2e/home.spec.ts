import { test, expect } from './config/test-setup';

test.describe('Home Page', () => {
  test('should load the home page with correct title and heading', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Verify the page title
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Verify the main heading is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/screenshots/home-page.png' });
  });

  test('should have a functional login link', async ({ page, loginPage }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Find and click the login link
    const loginLink = page.getByRole('link', { name: /sign in/i });
    await expect(loginLink).toBeVisible();
    
    // Click the login link
    await loginLink.click();
    
    // Verify we're on the login page
    await expect(page).toHaveURL(/.*\/login/);
    await loginPage.isCurrentPage();
  });

  test('should have a functional sign up link', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
    
    // Find and click the sign up link
    const signUpLink = page.getByRole('link', { name: /get started/i });
    await expect(signUpLink).toBeVisible();
    
    // Click the sign up link (assuming it takes to signup page)
    await signUpLink.click();
    
    // Verify we're on the signup page or the auth page
    await expect(page).toHaveURL(/.*\/(signup|auth)/);
  });
});
