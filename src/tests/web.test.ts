import { test, expect } from '@playwright/test';

test.describe('EXERCISE 1: WEB AUTOMATION', () => {
  test.use({baseURL: 'https://www.google.com/'});

  test('Perpoduce search workflow in Google with data verification on found page', async ({ page } ) => {
    page.goto('/')
    await page.getByRole('button', { name: 'Accept all' }).click();

    await page.getByLabel('Search', { exact: true }).fill('automation');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    await page.getByRole('link', { name: 'Automation Wikipedia https://' }).click();

    const element = page.getByText('before 1947');

    await element.scrollIntoViewIfNeeded();

    await expect(page.getByText('before 1947')).toBeVisible();
  });

  test.afterEach(async( {page}, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    page.close();
  });

})