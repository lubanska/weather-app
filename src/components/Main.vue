<script setup lang="ts">
import { ref } from 'vue'
import WeatherCard from './WeatherCard.vue'
import LoaderCard from './LoaderCard.vue'
import InputField from './InputField.vue'
import { useWeatherForecast } from '@/composables/useWeatherForecast'

const lat = ref(0)
const long = ref(0)
const name = ref('')

const { isLoading, error, weatherData } = useWeatherForecast(lat, long)

const handleUpdateCoords = (coords: { name: string; lat: number; long: number }) => {
  name.value = coords.name
  lat.value = coords.lat
  long.value = coords.long
}
</script>

<template>
  <div>
    <InputField @update:coords="handleUpdateCoords($event)" />

    <div v-if="error">Error: {{ error }}</div>

    <LoaderCard v-if="isLoading" />
    <WeatherCard v-if="weatherData" :weatherData="weatherData" :name="name" />
  </div>
</template>
