// Find more about weather codes:
// https://open-meteo.com/en/docs/dwd-api

const weatherCodes: Record<number, string> = {
  0: 'mdi-weather-sunny',
  1: 'mdi-weather-partly-cloudy',
  2: 'mdi-weather-partly-cloudy',
  3: 'mdi-weather-cloudy',
  45: 'mdi-weather-fog',
  48: 'mdi-weather-fog',
  51: 'mdi-weather-rainy',
  53: 'mdi-weather-rainy',
  55: 'mdi-weather-rainy',
  56: 'mdi-weather-snowy-rainy',
  57: 'mdi-weather-snowy-rainy',
  61: 'mdi-weather-pouring',
  63: 'mdi-weather-pouring',
  65: 'mdi-weather-pouring',
  66: 'mdi-weather-snowy-rainy',
  67: 'mdi-weather-snowy-rainy',
  71: 'mdi-weather-snowy',
  73: 'mdi-weather-snowy',
  75: 'mdi-weather-snowy',
  77: 'mdi-weather-snowy',
  80: 'mdi-weather-pouring',
  81: 'mdi-weather-pouring',
  82: 'mdi-weather-pouring',
  85: 'mdi-weather-snowy',
  86: 'mdi-weather-snowy-heavy',
  95: 'mdi-weather-lightning',
  96: 'mdi-weather-hail',
  99: 'mdi-weather-hail',
}

export const getWeatherIcon = (weatherCode: number) => {
  return weatherCodes[weatherCode]
}
