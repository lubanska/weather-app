<script setup lang="ts">
import { useWeatherForecast } from '@/composables/useWeatherForecast'

const { weatherData } = useWeatherForecast()
</script>

<template>
  <v-icon
    :icon="weatherData?.current.isDay ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
    size="24"
  ></v-icon>
</template>
