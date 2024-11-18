export interface CurrentWeather {
  isDay: boolean
  temp: number
  weatherIcon: string
  windSpeed: number
  rainChance: number
  uvIndex: number
  surfacePressure: number
}

export interface DailyWeather {
  day: string
  weatherIcon: string
  tempMax: number
  tempMin: number
}

export interface WeatherApiParsedResponse {
  location: string
  tempUnit: string
  windUnit: string
  pressureUnit: string
  current: CurrentWeather
  daily: DailyWeather[]
}

export interface LocationGeocodingData {
  name: string
  country: string
  admin: string
  lat: number
  long: number
  title: string
  value: string
}
