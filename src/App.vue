<script setup lang="ts">
import MainBody from '@/components/00-globals/MainBody.vue'
import NavigationBar from './components/00-globals/NavigationBar.vue'
import { useOpenMeteo } from './composables'

const { weatherData } = useOpenMeteo()
</script>

<template>
  <v-app :theme="weatherData?.current.isDay ? 'light' : 'dark'">
    <NavigationBar />

    <MainBody />
  </v-app>
</template>
