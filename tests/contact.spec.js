import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test.describe('Contact page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/contact`);
  });

    test('Contact page loads successfully and has correct Contact heading', async ({ page }) => {
    const heading = page.getByRole('heading', {name : 'Contact'});
    await expect(heading).toHaveText('Contact');
  });

    test('All required form fields should be visible', async ({ page }) => {
    await expect(page.getByPlaceholder('Your First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Your Last Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.locator('[data-test="subject"]')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.locator('[data-test="contact-submit"]')).toBeVisible();
  });

    test('Submit without filling any fields shows validation errors', async ({ page }) => {
    await page.locator('[data-test="contact-submit"]').click();
    await expect(page.getByText(/is required/)).toHaveCount(5);
  });

    test('Valid submission succeeds and shows confirmation', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');
    await page.locator('[data-test="nav-contact"]').click();
    await page.locator('[data-test="first-name"]').fill('test');
    await page.locator('[data-test="last-name"]').fill('testing');
    await page.locator('[data-test="email"]').fill('abc@gmail.com');
    await page.locator('[data-test="subject"]').selectOption('webmaster');
    await page.locator('[data-test="message"]').click();
    await page.locator('[data-test="message"]').fill('This is a test message and is solely for testing purpose. Thankyou so much ');
    await page.locator('[data-test="contact-submit"]').click();
    await expect(page.getByRole('alert')).toContainText('Thanks for your message! We will contact you shortly.');
});
  });
