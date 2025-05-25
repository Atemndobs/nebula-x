import { test, expect } from '../../config/test-setup';

test.describe('Homepage', () => {
  test('should load the homepage', async ({ homePage }) => {
    // Verify page title
    await homePage.verifyPageTitle();
    
    // Verify hero section is visible
    await homePage.verifyHeroSectionIsVisible();
    
    // Take a screenshot for visual regression
    await homePage.captureHeroSection();
  });

  test('should navigate to about section', async ({ homePage }) => {
    // Click on About link in navigation
    await homePage.clickNavLink('About');
    
    // Verify navigation to about section
    await homePage.verifyNavigationToSection('#about');
  });

  test('should navigate to services section', async ({ homePage }) => {
    // Click on Services link in navigation
    await homePage.clickNavLink('Services');
    
    // Verify navigation to services section
    await homePage.verifyNavigationToSection('#services');
  });

  test('should be responsive on mobile view', async ({ homePage, page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Verify mobile menu button is visible
    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
    
    // Take a screenshot of mobile view
    await homePage.takeScreenshot('mobile-homepage');
  });
});
