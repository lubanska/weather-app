export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  daily_units: DailyUnits
  daily: Daily
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  is_day: number
  weather_code: number
  surface_pressure: number
  wind_speed_10m: number
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  is_day: string
  weather_code: string
  surface_pressure: string
  wind_speed_10m: string
}

export interface Daily {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  uv_index_max: number[]
  precipitation_probability_max: number[]
}

export interface DailyUnits {
  time: string
  weather_code: string
  temperature_2m_max: string
  temperature_2m_min: string
  uv_index_max: string
  precipitation_probability_max: string
}

export interface GeocodingResponse {
  results: Result[]
  generationtime_ms: number
}

export interface Result {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  admin1_id?: number
  admin2_id?: number
  admin3_id?: number
  admin4_id?: number
  timezone: string
  population?: number
  postcodes?: string[]
  country_id: number
  country: string
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
}
