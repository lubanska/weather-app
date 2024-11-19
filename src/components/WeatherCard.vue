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
  <div>
    <v-row>
      <v-col align="center">
        <div class="text-overline">{{ name }}</div>
        <div class="text-caption">{{ weatherData.location }}</div>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="text-center">
      <v-col class="text-h1" cols="12" sm="auto">
        <!-- <v-icon :icon="weatherData.current.weatherIcon" size="72"></v-icon> -->
        {{ weatherData.current.temp }}{{ weatherData.tempUnit }}
      </v-col>

      <v-col class="text-start" cols="5" sm="auto">
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>
            {{ weatherData.current.windSpeed }} {{ weatherData.windUnit }}
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
          <v-list-item-subtitle>{{ weatherData.current.rainChance }}%</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-sun-wireless">
          <v-list-item-subtitle>{{ weatherData.current.uvIndex }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item density="compact" prepend-icon="mdi-gauge">
          <v-list-item-subtitle>
            {{ weatherData.current.surfacePressure }}
            {{ weatherData.pressureUnit }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>

    <!-- <v-icon
      v-if="weatherData.current.isDay"
      class="me-1 pb-1"
      icon="mdi-white-balance-sunny"
      size="18"
    ></v-icon>

    <v-icon v-else class="me-1 pb-1" icon="mdi-weather-night" size="18"></v-icon> -->

    <v-row>
      <v-col align="center">
        <v-btn
          flat
          :text="!expand ? 'See Forecast' : 'Hide Forecast'"
          @click="expand = !expand"
        ></v-btn>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-if="expand" class="mt-4">
        <v-divider></v-divider>

        <v-item-group>
          <v-container class="mx-auto d-flex flex-wrap justify-center align-center">
            <v-card
              v-for="(item, index) in weatherData.daily"
              :key="item.day"
              width="130"
              align="center"
              flat
            >
              <v-card-title class="text-overline">{{ item.day }}</v-card-title>
              <v-icon :icon="item.weatherIcon" size="24"></v-icon>
              <v-card-text class="text-caption">
                <strong> {{ item.tempMax }}° </strong>
                {{ item.tempMin }}°
              </v-card-text>
            </v-card>
          </v-container>
        </v-item-group>
      </div>
    </v-expand-transition>
  </div>
</template>
