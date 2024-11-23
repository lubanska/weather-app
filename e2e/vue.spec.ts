import { test, expect, BrowserContext } from '@playwright/test'
import { mockGeocodingApiResponse, mockOpenMeteoApiResponse } from './mockResponses.ts'

// HELPERS
const mockGeocodingAPI = async (context: BrowserContext, response = {}, delay = 0) => {
  await context.route('https://geocoding-api.open-meteo.com/v1/search*', (route) => {
    setTimeout(() => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(response),
        contentType: 'application/json',
      })
    }, delay)
  })
}

const mockOpenMeteoAPI = async (
  context: BrowserContext,
  response = {},
  delay = 0,
  status = 200,
) => {
  await context.route('https://api.open-meteo.com/v1/forecast*', (route) => {
    setTimeout(() => {
      route.fulfill({
        status,
        body: JSON.stringify(response),
        contentType: 'application/json',
      })
    }, delay)
  })
}

test.beforeEach(async ({ page, context }) => {
  // Set up mocks before navigating to the page
  await mockGeocodingAPI(context, mockGeocodingApiResponse['berlin'])
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['copenhagen'], 200)

  // Set up a web address
  await page.goto('/')
})

// CORE FUNCTIONALITY
test('displays location input field on initial load', async ({ page }) => {
  await expect(page.getByLabel('Location', { exact: true })).toBeVisible()
})

test('autocomplete suggestions show expected location', async ({ page }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')
  await expect(page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' })).toBeVisible()
})

test('selecting location displays correct weather data', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo API Response for Berlin
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')
})

test('clearing location input resets to default', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo API Response for Berlin
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')

  // Mock Api Response to default
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['copenhagen'])

  await page.getByLabel('Clear Location').click()
  await expect(page.getByLabel('Location', { exact: true })).toBeEmpty()

  await expect(page.getByRole('main')).toContainText('Europe/Copenhagen')
})

test('changing location updates weather data', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo API Response for Berlin
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')

  // Mock Api Response
  await mockGeocodingAPI(context, mockGeocodingApiResponse['paris'])
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['paris'])

  await page.getByLabel('Location', { exact: true }).fill('par')

  await page.getByRole('option', { name: 'Paris, Île-de-France, France' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Paris')
})

// UI & A11Y
test('displays loader skeleton while API is loading', async ({ page }) => {
  await expect(page.locator('.card-loader')).toBeVisible()

  // Wait for the data to load and the loader to disappear
  await expect(page.locator('.card-loader')).toBeHidden()

  // Check if the weather data has loaded after the delay
  await expect(page.getByRole('main')).toContainText('Europe/Copenhagen')
})

test('keyboard navigation in autocomplete dropdown', async ({ page }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')
  await expect(page.getByRole('listbox')).toBeVisible()
  await page.getByLabel('Location', { exact: true }).press('ArrowUp')
  const firstOption = page.locator('[role="option"]').nth(0)
  await expect(firstOption).toHaveClass(/v-list-item--active/)

  const selectedText = await firstOption.textContent()
  expect(selectedText).not.toBeNull()

  await page.getByLabel('Location', { exact: true }).press('Enter')

  await expect(page.getByLabel('Location', { exact: true })).toHaveValue(selectedText!.trim())
})

// EDGE CASES
test('error message shown on API error response', async ({ page, context }) => {
  // Set up mocks before navigating to the page
  await mockOpenMeteoAPI(context, mockOpenMeteoApiResponse['copenhagen'], 200, 404)

  // Set up a web address
  await page.goto('/')

  await expect(page.locator('.card-error')).toBeVisible()
})
