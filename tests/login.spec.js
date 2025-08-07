// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://practicesoftwaretesting.com/');
//   await page.locator('[data-test="nav-sign-in"]').click();
//   await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
//   await page.locator('[data-test="password"]').fill('welcome01');
//   await page.locator('[data-test="login-submit"]').click();
//   await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe');
// });

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test.describe('Login Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/login`);
  });

  test('Login with valid credentials', async ({ page }) => {
    await page.locator('[data-test="email"]').fill('admin@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('John Doe');
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.locator('[data-test="email"]').fill('admintest@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.locator("//div[@class='alert alert-danger']")).toContainText('Invalid email or password');
  });

  test('Login with empty email ', async ({ page }) => {
    await page.locator('[data-test="email"]').fill('');
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.locator("//div[@id='email-error']")).toContainText('Email is required');
  });

    test('Login with empty password ', async ({ page }) => {
    await page.locator('[data-test="email"]').fill('admintest@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').fill('');
    await page.locator('[data-test="login-submit"]').click();
    await expect(page.locator('//*[@id="password-error"]')).toContainText('Password is required');
  });

  test('Invalid email format', async ({ page }) => {
    await page.getByLabel('Email').fill('hello');
    await page.getByPlaceholder('Your Password').fill('pass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('//*[@id="email-error"]/div')).toContainText('Email format is invalid');
  });

  // test('Password field hides input (secure)', async ({ page }) => {
  //   const inputType = await page.getByLabel('Password').getAttribute('type');
  //   expect(inputType).toBe('password');
  // });

});
