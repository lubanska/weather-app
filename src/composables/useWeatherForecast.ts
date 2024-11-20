import type { CurrentWeather, DailyWeather, WeatherApiParsedResponse } from '@/types'
import { getWeatherIcon } from '@/utils/getWeatherIcon'
import { computed, ref, watchEffect, type Ref } from 'vue'

export const useWeatherForecast = (lat: Ref<number>, long: Ref<number>) => {
  const data = ref<null | any>(null)
  const error = ref<null | string>(null)
  const isLoading = ref<boolean>(true)

  const weatherData = computed<WeatherApiParsedResponse | null>(() => {
    if (!data.value) return null

    const current = data.value.current
    const daily = data.value.daily

    const currentWeather: CurrentWeather = {
      isDay: current.is_day === 1,
      temp: current.temperature_2m,
      weatherIcon: getWeatherIcon(current.weather_code),
      conditions: [
        {
          condition: 'windSpeed',
          icon: 'mdi-weather-windy',
          value: current.wind_speed_10m + data.value.current_units.wind_speed_10m,
        },
        {
          condition: 'rainChance',
          icon: 'mdi-weather-pouring',
          value: daily.precipitation_probability_max[0] + '%',
        },
        {
          condition: 'uvIndex',
          icon: 'mdi-sun-wireless',
          value: daily.uv_index_max[0],
        },
        {
          condition: 'surfacePressure',
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

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(
        `${endpoint}?latitude=${lat.value}&longitude=${long.value}&${params}`,
        options,
      )

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

  return { weatherData, error, isLoading }
}
