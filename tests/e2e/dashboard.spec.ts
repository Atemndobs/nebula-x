import { test, expect } from './config/test-setup';

// Test user credentials from environment variables
const TEST_EMAIL = process.env.TEST_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'testpassword123';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ loginPage, dashboardPage }) => {
    // Login before each test
    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await dashboardPage.isCurrentPage();
  });

  test('should load the dashboard with all components', async ({ page, dashboardPage }) => {
    // Verify the dashboard title
    await expect(page.getByRole('heading', { name: /resources dashboard/i })).toBeVisible();
    
    // Verify the welcome message shows the username
    const username = await dashboardPage.getUserEmail();
    expect(username).toBeTruthy();
    
    // Verify the main sections are visible
    await expect(page.getByRole('navigation')).toBeVisible(); // Sidebar
    await expect(page.getByRole('banner')).toBeVisible(); // Top navigation
    
    // Take a screenshot for visual verification
    await dashboardPage.takeScreenshot('dashboard-loaded');
  });

  test('should display AWS usage dashboard', async ({ page }) => {
    // Verify the AWS usage dashboard is loaded
    await expect(page.getByText(/AWS Resource Usage/i)).toBeVisible();
    
    // Check for common AWS resource sections
    const resourceSections = [
      'EC2 Instances',
      'S3 Buckets',
      'RDS Databases',
      'Lambda Functions'
    ];
    
    for (const section of resourceSections) {
      await expect(page.getByRole('heading', { name: section, level: 2 })).toBeVisible({
        timeout: 5000
      });
    }
  });

  test('should have a functional navigation menu', async ({ page }) => {
    // Open the mobile menu (if on mobile)
    const menuButton = page.getByRole('button', { name: /open menu/i });
    const isMobile = await menuButton.isVisible();
    
    if (isMobile) {
      await menuButton.click();
    }
    
    // Verify navigation links
    const navLinks = [
      { name: /dashboard/i, url: /\/dashboard/ },
      { name: /resources/i, url: /\/resources/ },
      { name: /analytics/i, url: /\/analytics/ },
      { name: /settings/i, url: /\/settings/ }
    ];
    
    for (const link of navLinks) {
      const navLink = page.getByRole('link', { name: link.name });
      await expect(navLink).toBeVisible();
      
      // Click the link and verify navigation
      await navLink.click();
      await expect(page).toHaveURL(link.url);
      
      // Navigate back to dashboard for the next test
      if (!link.name.test('dashboard')) {
        await page.goBack();
      }
    }
  });

  test('should log out successfully', async ({ dashboardPage, loginPage }) => {
    // Log out from the dashboard
    await dashboardPage.logout();
    
    // Verify we're on the login page
    await loginPage.isCurrentPage();
    
    // Try to navigate back to dashboard - should redirect to login
    await dashboardPage.navigate();
    await loginPage.isCurrentPage();
  });
});
