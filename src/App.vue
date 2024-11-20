<script setup lang="ts">
import Main from '@/components/Main.vue'
import NavigationBar from './components/NavigationBar.vue'
import { useWeatherForecast } from './composables/useWeatherForecast'

const { weatherData } = useWeatherForecast()
</script>

<template>
  <v-app :theme="weatherData?.current.isDay ? 'light' : 'dark'">
    <NavigationBar />

    <Main />
  </v-app>
</template>
