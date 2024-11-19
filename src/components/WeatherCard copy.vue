<script lang="ts" setup>
import type { WeatherApiParsedResponse } from '@/types'
import { ref } from 'vue'

export interface Props {
  weatherData: WeatherApiParsedResponse
  name: string
}

defineProps<Props>()

const expand = ref<boolean>(false)
</script>

<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item :title="name">
      <template v-slot:subtitle>
        {{ weatherData.location }}
        <v-icon
          v-if="weatherData.current.isDay"
          class="me-1 pb-1"
          icon="mdi-white-balance-sunny"
          size="18"
        ></v-icon>

        <v-icon v-else class="me-1 pb-1" icon="mdi-weather-night" size="18"></v-icon>
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6">
          {{ weatherData.current.temp }}{{ weatherData.tempUnit }}</v-col
        >

        <v-col class="text-right" cols="6">
          <v-icon :icon="weatherData.current.weatherIcon" size="88"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle
          >{{ weatherData.current.windSpeed }} {{ weatherData.windUnit }}</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>{{ weatherData.current.rainChance }}%</v-list-item-subtitle>
      </v-list-item>
    </div>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-gauge">
        <v-list-item-subtitle
          >{{ weatherData.current.surfacePressure }}
          {{ weatherData.pressureUnit }}</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-sun-wireless">
        <v-list-item-subtitle>{{ weatherData.current.uvIndex }}</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <v-list class="bg-transparent">
          <v-list-item
            v-for="(item, index) in weatherData.daily"
            :key="item.day"
            :append-icon="item.weatherIcon"
            :subtitle="item.tempMax + ' / ' + item.tempMin + weatherData.tempUnit"
            :title="item.day"
            :active="index === 0"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :text="!expand ? 'See Forecast' : 'Hide Forecast'" @click="expand = !expand"></v-btn>
    </v-card-actions>
  </v-card>
</template>
