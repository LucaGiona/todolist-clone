import { test, expect } from '@playwright/test';

// These tests require a logged-in user.
// They use storageState from the auth setup fixture.
// For CI, set up a test user and run auth.setup.ts first.

test.describe('Todo Management (authenticated)', () => {
  // Skip these tests unless a valid session is available
  test.skip(({ browserName }) => browserName !== 'chromium', 'Desktop Chrome only');

  test('dashboard page structure', async ({ page }) => {
    await page.goto('/sign-in');

    // Fill in test credentials (adjust if you have a test user)
    const email = process.env.TEST_USER_EMAIL ?? '';
    const password = process.env.TEST_USER_PASSWORD ?? '';

    if (!email || !password) {
      test.skip();
      return;
    }

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('/', { timeout: 10000 });

    // Sidebar
    await expect(page.getByText('Todoist Clone')).toBeVisible();
    await expect(page.getByRole('link', { name: 'All Tasks' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage Tags' })).toBeVisible();

    // Header with user menu
    await expect(page.getByRole('button').filter({ has: page.locator('.rounded-full') })).toBeVisible();

    // Add Task button
    await expect(page.getByRole('button', { name: 'Add Task' })).toBeVisible();
  });

  test('can open create todo dialog', async ({ page }) => {
    await page.goto('/sign-in');
    const email = process.env.TEST_USER_EMAIL ?? '';
    const password = process.env.TEST_USER_PASSWORD ?? '';

    if (!email || !password) {
      test.skip();
      return;
    }

    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('/');

    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'New Task' })).toBeVisible();
    await expect(page.getByLabel('Title *')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
  });
});
