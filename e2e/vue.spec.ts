import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro

// CORE FUNCTIONALITY
test('weather app has an input field', async ({ page }) => {
  await page.goto('https://weather-app-ruby-iota-54.vercel.app/')
  await expect(page.getByLabel('inputAutocomplete')).toBeVisible()
})

// test('verify the autocomplete feature works', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('input location and verify data is displayed on the screen', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('search for another location to verify data updates accordingly', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// // EDGE CASES
// test('invalid or nonexistent location', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('prevent empty inputs', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('simulate api error', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// // UI and A11y
// test('keyboard navigation', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('loader on the weather card', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })

// test('theme synced with day / night', async ({ page }) => {
//   await page.goto('/')
//   await expect(page.locator('div.greetings > h1')).toHaveText('You did it!')
// })
