export interface CurrentWeather {
  isDay: boolean
  temp: number
  weatherIcon: string
  conditions: WeatherCondition[]
}

export interface WeatherCondition {
  condition: string
  icon: string
  value: string
}

export interface DailyWeather {
  day: string
  weatherIcon: string
  tempMax: number
  tempMin: number
}

export interface OpenMeteoParsedResponse {
  location: string
  tempUnit: string
  windUnit: string
  pressureUnit: string
  current: CurrentWeather
  daily: DailyWeather[]
}

export interface LocationGeocodingData {
  name: string
  lat: number
  long: number
  title: string
  value: string
}

export interface LocationCoords {
  name: string
  lat: number
  long: number
}
