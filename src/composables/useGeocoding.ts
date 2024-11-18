import type { LocationGeocodingData } from '@/types'
import { computed, ref, watchEffect, type Ref } from 'vue'

export const useGeocoding = (query: Ref<string>) => {
  const data = ref<null | any>(null)
  const error = ref<null | string>(null)
  const isLoading = ref<boolean>(true)

  const locationData = computed<LocationGeocodingData[] | null>(() => {
    if (!data.value) return null

    return data.value.results.map((result: Record<string, string | number | string[]>) => {
      return {
        name: result.name,
        country: result.country,
        admin: result.admin1,
        lat: result.latitude,
        long: result.longitude,
        title: `${result.name}, ${result.admin1}, ${result.country}`,
        value: result.id,
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

  watchEffect(() => {
    fetchData()
  })

  return { locationData, error, isLoading }
}
