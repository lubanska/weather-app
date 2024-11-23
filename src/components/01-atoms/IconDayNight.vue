<script setup lang="ts">
import { useOpenMeteo } from '@/composables'

const { weatherData } = useOpenMeteo()
</script>

<template>
  <v-icon
    :icon="weatherData?.current.isDay ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
    size="24"
  ></v-icon>
</template>
