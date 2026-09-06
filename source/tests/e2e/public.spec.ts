import { expect, test } from '@playwright/test'

test('public discovery routes render and omit standalone SAP consulting', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Build Future-Ready Skills/i)
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toContainText('Programs')
  await expect(page.locator('body')).not.toContainText('SAP Enterprise Consulting')

  await page.goto('/programs')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Applied programs')
  await expect(page.locator('body')).not.toContainText('SAP Enterprise Consulting')
})

test('brochure gate exposes required identity fields and optional channel consent', async ({ page }) => {
  await page.goto('/courses/ai-engineering')
  await page.getByRole('button', { name: 'Download brochure' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByLabel('Name')).toHaveAttribute('required', '')
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toHaveAttribute('required', '')
  await expect(page.getByLabel('Mobile')).toHaveAttribute('required', '')
  await expect(page.getByText('Marketing choices remain optional')).toBeVisible()
})
