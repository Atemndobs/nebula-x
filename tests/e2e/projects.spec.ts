import { test, expect } from './config/test-setup';
import { ProjectsPage } from './pages/projects-page';

test.describe('Projects Page', () => {
  let projectsPage: ProjectsPage;

  test.beforeEach(async ({ page }) => {
    projectsPage = new ProjectsPage(page);
    await projectsPage.navigate();
    await projectsPage.isCurrentPage();
  });

  test('should display customer ID on the page', async () => {
    // Get the customer ID element and verify it's visible and contains expected format
    const customerId = await projectsPage.getCustomerId();
    
    // Verify customer ID is in the expected format (e.g., "CUST-1234")
    expect(customerId).toMatch(/^CUST-\d+$/);
    
    // Take a screenshot for visual verification
    const page = projectsPage.getPageForTesting();
    await page.screenshot({ path: 'test-results/screenshots/projects-page-customer-id.png' });
  });


});
