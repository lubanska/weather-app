<script setup lang="ts">
import { ref } from 'vue'
import WeatherCard from './WeatherCard.vue'
import LoaderCard from './LoaderCard.vue'
import InputField from './InputField.vue'
import { useWeatherForecast } from '@/composables/useWeatherForecast'

const lat = ref(55.67594)
const long = ref(12.56553)
const name = ref('Copenhagen, Capital Region, Denmark')

const { isLoading, error, weatherData } = useWeatherForecast(lat, long)

const handleUpdateCoords = (coords: { name: string; lat: number; long: number }) => {
  name.value = coords.name
  lat.value = coords.lat
  long.value = coords.long

  console.log('Updated coords:', coords)
}
</script>

<template>
  <v-app class="bg-blue">
    <v-app-bar flat height="72">
      <v-container class="mx-auto d-flex flex-wrap justify-center align-center">
        <v-avatar class="mr-4 hidden md:block" icon="mdi-white-balance-sunny"></v-avatar>

        <v-app-bar-title class="d-none d-sm-flex">Weather App</v-app-bar-title>

        <v-spacer class="d-none d-md-flex"></v-spacer>

        <v-responsive width="240">
          <InputField @update:coords="handleUpdateCoords($event)" />
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet>
          <div v-if="error">Error: {{ error }}</div>

          <LoaderCard v-if="isLoading" />
          <WeatherCard v-if="weatherData" :weatherData="weatherData" :name="name" />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>
