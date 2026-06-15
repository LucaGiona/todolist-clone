import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('sign-in page renders correctly', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page.getByRole('heading', { name: 'Todoist Clone' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByText("Don't have an account?")).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });

  test('sign-up page renders correctly', async ({ page }) => {
    await page.goto('/sign-up');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
  });

  test('navigates between sign-in and sign-up', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL('/sign-up');

    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/sign-in');
  });

  test('unauthenticated user is redirected to sign-in', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/sign-in/);
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
  });
});
