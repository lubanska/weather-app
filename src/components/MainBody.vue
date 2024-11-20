<script lang="ts" setup>
import CardLoader from './CardLoader.vue'
import CardWeather from './CardWeather.vue'
import CardError from './CardError.vue'

import { useWeatherForecast } from '@/composables/useWeatherForecast'

const { weatherData, coords, isLoading, error } = useWeatherForecast()
</script>

<template>
  <v-main>
    <v-container>
      <v-sheet class="mt-10 rounded-lg bg-surface-light">
        <CardError v-if="error" :error="error" />

        <CardLoader v-else-if="isLoading" />

        <CardWeather v-else-if="weatherData" :weatherData="weatherData" :coords="coords" />
      </v-sheet>
    </v-container>
  </v-main>
</template>
