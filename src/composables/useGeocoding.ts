import type { LocationGeocodingData } from '@/types'
import { computed, watch, type Ref } from 'vue'
import { useFetch } from './useFetch'

export const useGeocoding = (query: Ref<string>) => {
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

  const { data, error, isLoading, fetchData } = useFetch<any>()

  const endpoint = 'https://geocoding-api.open-meteo.com/v1/search'
  const params = new URLSearchParams({
    count: '10',
    language: 'en',
    format: 'json',
  })
  const options = {
    method: 'GET',
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
        fetchData(`${endpoint}?name=${query.value}&${params}`, options)
      }, 500) // 500ms debounce delay
    }
  })

  return { locationData, error, isLoading }
}
