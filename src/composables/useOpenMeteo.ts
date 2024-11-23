import type {
  CurrentWeather,
  DailyWeather,
  LocationCoords,
  OpenMeteoParsedResponse,
} from '@/types/appTypes'
import type { OpenMeteoResponse } from '@/types/responseTypes'
import { getWeatherIcon } from '@/utils/getWeatherIcon'
import { computed, ref, watch } from 'vue'
import { useFetch } from './useFetch'

const { data, error, isLoading, fetchData } = useFetch<OpenMeteoResponse>()

const coords = ref<LocationCoords>({
  name: 'Copenhagen, Capital Region, Denmark',
  lat: 55.67594,
  long: 12.56553,
})

// Composable handling OpenMeteo API calls and data parsing
export const useOpenMeteo = () => {
  const weatherData = computed<OpenMeteoParsedResponse | null>(() => {
    if (!data.value) return null

    const current = data.value.current
    const daily = data.value.daily

    const currentWeather: CurrentWeather = {
      isDay: current.is_day === 1,
      temp: current.temperature_2m,
      weatherIcon: getWeatherIcon(current.weather_code),
      conditions: [
        {
          condition: 'Wind speed',
          icon: 'mdi-weather-windy',
          value: current.wind_speed_10m + data.value.current_units.wind_speed_10m,
        },
        {
          condition: 'Rain chance',
          icon: 'mdi-weather-pouring',
          value: daily.precipitation_probability_max[0] + '%',
        },
        {
          condition: 'UV index',
          icon: 'mdi-sun-wireless',
          value: daily.uv_index_max[0].toString(),
        },
        {
          condition: 'Surface pressure',
          icon: 'mdi-gauge',
          value: current.surface_pressure + data.value.current_units.surface_pressure,
        },
      ],
    }

    const dailyWeather: DailyWeather[] = daily.time.map((day: string, index: number) => ({
      day: new Date(day).toLocaleDateString('en-US', { weekday: 'long' }),
      weatherIcon: getWeatherIcon(daily.weather_code[index]),
      tempMax: daily.temperature_2m_max[index],
      tempMin: daily.temperature_2m_min[index],
    }))

    return {
      location: data.value.timezone.replace('_', ' '),
      tempUnit: data.value.current_units.temperature_2m,
      windUnit: data.value.current_units.wind_speed_10m,
      pressureUnit: data.value.current_units.surface_pressure,
      current: currentWeather,
      daily: dailyWeather.slice(1),
    }
  })

  const endpoint = 'https://api.open-meteo.com/v1/forecast'
  const params = new URLSearchParams({
    current: 'temperature_2m,is_day,weather_code,surface_pressure,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max',
    forecast_days: '4',
    timezone: 'auto',
  })
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  const updateCoords = (newCoords: LocationCoords) => {
    coords.value = newCoords
  }

  watch(
    coords,
    async (newCoords) => {
      await fetchData(
        `${endpoint}?latitude=${newCoords.lat}&longitude=${newCoords.long}&${params}`,
        options,
      )
    },
    { immediate: true },
  )

  return { weatherData, coords, error, isLoading, updateCoords }
}
