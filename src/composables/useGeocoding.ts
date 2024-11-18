import type { LocationGeocodingData } from '@/types'
import { computed, ref, watch, type Ref } from 'vue'

export const useGeocoding = (query: Ref<string>) => {
  const data = ref<null | any>(null)
  const error = ref<null | string>(null)
  const isLoading = ref<boolean>(true)

  const locationData = computed<LocationGeocodingData[] | null>(() => {
    if (!data.value || !data.value.results) return null

    return data.value.results.map((result: Record<string, string | number | string[]>) => {
      return {
        name: result.name,
        lat: result.latitude,
        long: result.longitude,
        title: [result.name, result.admin1, result.country].filter(Boolean).join(', '),
        value: result.id.toString(),
      }
    })
  })

  const endpoint = 'https://geocoding-api.open-meteo.com/v1/search'
  const params = new URLSearchParams({
    count: '10',
    language: 'en',
    format: 'json',
  })
  const options = {
    method: 'GET',
  }

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`${endpoint}?name=${query.value}&${params}`, options)

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  // Debounce logic
  let timeoutId: number | null = null
  watch(query, (newQuery) => {
    // Only trigger search if the query has 3 or more characters
    if (newQuery.length >= 3) {
      // If a timeout exists, clear it
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      // Set a new timeout to delay the fetch call
      timeoutId = setTimeout(() => {
        fetchData()
      }, 500) // 500ms debounce delay
    }
  })

  return { locationData, error, isLoading }
}
