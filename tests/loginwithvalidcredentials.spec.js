import { test, expect } from '@playwright/test';
import config from '../configdetails.json' assert { type: "json" };

//const BASE_URL = 'https://practicesoftwaretesting.com';

test.describe('Login Functionality Tests', () => {


  test('Login with valid credentials', async ({ page }) => {
    // await page.goto('/dashboard');
    await page.screenshot({ path: 'login-page.png' });
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe', { timeout: 15000 });
    //await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe');
    //console.log(await page.content());
  });


 
});
