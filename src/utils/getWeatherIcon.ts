// WMO Weather interpretation codes (WW)
// Code	Description
// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail - // mdi-weather-hail

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
