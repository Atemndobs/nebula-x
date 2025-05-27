import { test, expect } from './config/test-setup';

// Test user credentials from environment variables
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'testpassword123';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Clear session storage before each test
    await page.context().clearCookies();
  });

  test('should redirect unauthenticated users to login page', async ({ page, dashboardPage }) => {
    // Try to access dashboard without logging in
    await dashboardPage.navigate();
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/.*\/login/);
    
    // Login page should be visible
    await expect(page.getByRole('heading', { name: /sign in to your account/i })).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    
    // Verify error message is shown
    await loginPage.assertErrorMessage('Failed to sign in. Please check your credentials.');
  });

  test('should login with valid credentials', async ({ loginPage, dashboardPage }) => {
    // Navigate to login and sign in
    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    
    // Should be redirected to dashboard after successful login
    await dashboardPage.isCurrentPage();
    
    // Verify user is logged in by checking the greeting
    const username = await dashboardPage.getUserEmail();
    expect(username).toBeTruthy();
    
    // Take a screenshot for visual verification
    await dashboardPage.takeScreenshot('dashboard-after-login');
  });

  test('should persist login after page refresh', async ({ page, loginPage, dashboardPage }) => {
    // Login first
    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await dashboardPage.isCurrentPage();
    
    // Refresh the page
    await page.reload();
    await dashboardPage.isCurrentPage(); // Should still be on dashboard
    
    // Verify user is still logged in
    const username = await dashboardPage.getUserEmail();
    expect(username).toBeTruthy();
  });

  test('should logout successfully', async ({ loginPage, dashboardPage }) => {
    // First login
    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await dashboardPage.isCurrentPage();
    
    // Then logout
    await dashboardPage.logout();
    
    // Should be redirected to login page after logout
    await loginPage.isCurrentPage();
    
    // Try to access dashboard again - should redirect to login
    await dashboardPage.navigate();
    await loginPage.isCurrentPage();
  });
});
