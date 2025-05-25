import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  // Locators
  private readonly navBar = this.page.locator('nav');
  private readonly heroSection = this.page.locator('section.hero');
  private readonly aboutSection = this.page.locator('section#about');
  private readonly servicesSection = this.page.locator('section#services');
  
  constructor(page: Page) {
    super(page);
  }

  // Actions
  async navigateToHome() {
    await this.navigate('/');
  }

  async clickNavLink(linkText: string) {
    await this.page.getByRole('link', { name: linkText, exact: true }).first().click();
  }

  // Assertions
  async verifyPageTitle() {
    const title = await this.getPageTitle();
    expect(title).toContain('Nebula Logix');
  }

  async verifyHeroSectionIsVisible() {
    await expect(this.heroSection).toBeVisible();
  }

  async verifyNavigationToSection(sectionId: string) {
    const section = this.page.locator(`section${sectionId}`);
    await expect(section).toBeInViewport();
  }

  // Visual Testing
  async captureHeroSection() {
    await this.heroSection.screenshot({ path: 'test-results/screenshots/hero-section.png' });
  }
}
