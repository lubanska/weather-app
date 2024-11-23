import type { GeocodingResponse, OpenMeteoResponse } from '../src/types/responseTypes.ts'
import { test, expect, BrowserContext } from '@playwright/test'
import { mockGeocodingResponse, mockOpenMeteoResponse } from './mockResponses.ts'

// Mock API Calls
const mockGeocodingCall = async (context: BrowserContext, response: GeocodingResponse) => {
  await context.route('https://geocoding-api.open-meteo.com/v1/search*', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(response),
      contentType: 'application/json',
    })
  })
}

const mockOpenMeteoCall = async (
  context: BrowserContext,
  response: OpenMeteoResponse | null,
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
  // Set up mock call responses before navigation to the page
  await mockGeocodingCall(context, mockGeocodingResponse['berlin'])
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['copenhagen'], 200)

  // Set up a web address
  await page.goto('/')
})

// Core Functionality
test('displays location input field on initial load', async ({ page }) => {
  await expect(page.getByLabel('Location', { exact: true })).toBeVisible()
})

test('autocomplete suggestions show expected location', async ({ page }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')
  await expect(page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' })).toBeVisible()
})

test('selecting location displays correct weather data', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo call to represent response to user input
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')
})

test('clearing location input resets to default', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo call to represent response to user input
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')

  // Mock OpenMeteo call to represent default response
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['copenhagen'])

  await page.getByLabel('Clear Location').click()
  await expect(page.getByLabel('Location', { exact: true })).toBeEmpty()
  await expect(page.getByRole('main')).toContainText('Europe/Copenhagen')
})

test('changing location updates weather data', async ({ page, context }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')

  // Mock OpenMeteo call to represent response to user input
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['berlin'])

  await page.getByRole('option', { name: 'Berlin, Land Berlin, Germany' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Berlin')

  // Mock OpenMeteo and Geocoding calls to represent response to user input
  await mockGeocodingCall(context, mockGeocodingResponse['paris'])
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['paris'])

  await page.getByLabel('Location', { exact: true }).fill('par')
  await page.getByRole('option', { name: 'Paris, Île-de-France, France' }).click()
  await expect(page.getByRole('main')).toContainText('Europe/Paris')
})

// UI & A11Y
test('displays loader skeleton while API is loading', async ({ page }) => {
  // Loader displayed when the OpenMeteo call is loading
  await expect(page.locator('.card-loader')).toBeVisible()

  // Loader disappears after data is loaded
  await expect(page.locator('.card-loader')).toBeHidden()

  // Data is available in the app
  await expect(page.getByRole('main')).toContainText('Europe/Copenhagen')
})

test('keyboard navigation in autocomplete dropdown', async ({ page }) => {
  await page.getByLabel('Location', { exact: true }).fill('ber')
  await expect(page.getByRole('listbox')).toBeVisible()

  // Navigate to option using keyboard navigation
  await page.getByLabel('Location', { exact: true }).press('ArrowUp')

  // Check if the option has active state
  const firstOption = page.locator('[role="option"]').nth(0)
  await expect(firstOption).toHaveClass(/v-list-item--active/)

  // Check if the option has text
  const selectedText = await firstOption.textContent()
  expect(selectedText).not.toBeNull()

  // Select option using keyboard navigation
  await page.getByLabel('Location', { exact: true }).press('Enter')
  await expect(page.getByLabel('Location', { exact: true })).toHaveValue(selectedText!.trim())
})

// EDGE CASES
test('error message shown on API error response', async ({ page, context }) => {
  // Mock 404 error
  await mockOpenMeteoCall(context, mockOpenMeteoResponse['copenhagen'], 200, 404)

  // Set up a web address
  await page.goto('/')

  // Verify if the error is shown
  await expect(page.locator('.card-error')).toBeVisible()
})
