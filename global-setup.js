const { chromium } = require('@playwright/test');
const { email, password } = require('./configdetails.json');

async function globalSetup(config) {
const { baseURL } = config.projects[0].use;
const storageState = 'storageState.json'; // Always save to this file

  // Debug log
  console.log('EMAIL:', email, 'PASSWORD:', password);
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to login page
    await page.goto(`${baseURL}/auth/login`);
    await page.waitForSelector('[data-test="email"]');
  // Fill login form
    await page.locator('[data-test="email"]').fill(email);
    const passwordField = await page.$('[data-test="password"]');
    await passwordField.fill(password);
    await page.locator('[data-test="login-submit"]').click();
  
  // Wait for either nav-menu or error message
  try {
    await page.waitForSelector('[data-test="nav-menu"]', { timeout: 10000 });
    console.log('✅ Login successful, nav-menu found.');
  } catch (e) {
    await page.screenshot({ path: 'global-setup-login-failed.png' });
    console.log('❌ Login failed. Screenshot saved as global-setup-login-failed.png');
    console.log(await page.content());
    await browser.close();
    throw new Error('Login failed in global setup. See screenshot and HTML output above.');
  }
    
  // Save login session (cookies, localStorage, etc.)
  await page.context().storageState({ path: storageState });
  console.log('✅ storageState.json saved at', storageState);

  await browser.close();
}

module.exports = globalSetup;
