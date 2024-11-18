<script setup lang="ts">
import { ref } from 'vue'
import WeatherCard from './WeatherCard.vue'
import LoaderCard from './LoaderCard.vue'
import { useWeatherForecast } from '@/composables/useWeatherForecast'

const lat = ref(55.6759)
const long = ref(12.5655)

const { isLoading, error, weatherData } = useWeatherForecast(lat.value, long.value)
</script>

<template>
  <div>
    Lat: {{ lat }} Long: {{ long }}

    <div v-if="error">Error: {{ error }}</div>

    <LoaderCard v-if="isLoading" />
    <WeatherCard v-if="weatherData" :weatherData="weatherData" />
  </div>
</template>
