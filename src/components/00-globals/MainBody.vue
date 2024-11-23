<script lang="ts" setup>
import CardLoader from '@/components/03-organisms/CardLoader.vue'
import CardWeather from '@/components/03-organisms/CardWeather.vue'
import CardError from '@/components/03-organisms/CardError.vue'
import { useOpenMeteo } from '@/composables'

const { weatherData, coords, isLoading, error } = useOpenMeteo()
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
