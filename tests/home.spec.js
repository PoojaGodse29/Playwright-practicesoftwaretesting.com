import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Page loads successfully and has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/i);
  });


  test('Navigation bar and its sub links', async ({ page }) => {
    const navigationbar = page.getByRole('navigation')
    await expect(navigationbar.getByRole('link' , {name : 'Home'})).toBeVisible();
    await expect(navigationbar.getByRole('link' , {name : 'Contact'})).toBeVisible();
    await expect(navigationbar.getByRole('link' , {name : 'Sign in'})).toBeVisible();
    const categoriesLink = page.locator("//a[normalize-space()='Categories']")
    await categoriesLink.click();
    await expect(page.locator("//a[normalize-space()='Hand Tools']")).toBeVisible();
    await expect(page.locator("//a[normalize-space()='Power Tools']")).toBeVisible();
});


  test('Footer is visible', async ({ page }) => {
    const footer = page.locator('app-footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('This is a DEMO application ');
  });


});
