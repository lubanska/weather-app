<script setup lang="ts">
import MainBody from '@/components/MainBody.vue'
import NavigationBar from './components/NavigationBar.vue'
import { useWeatherForecast } from './composables/useWeatherForecast'

const { weatherData } = useWeatherForecast()
</script>

<template>
  <v-app :theme="weatherData?.current.isDay ? 'light' : 'dark'">
    <NavigationBar />

    <MainBody />
  </v-app>
</template>
