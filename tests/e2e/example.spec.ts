// E2E placeholder test
import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/.*/)
})
