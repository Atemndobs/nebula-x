import { FullConfig, chromium } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  
  try {
    // Navigate to login page
    await page.goto(baseURL + '/login');
    
    // Perform login
    await loginPage.login(
      process.env.TEST_EMAIL || 'test@example.com',
      process.env.TEST_PASSWORD || 'testpassword123'
    );
    
    // Wait for dashboard to load
    await dashboardPage.isCurrentPage();
    
    // Save signed-in state to 'storageState.json'
    await page.context().storageState({ path: storageState as string });
    console.log('Login successful, storage state saved.');
  } catch (error) {
    console.error('Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
