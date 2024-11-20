<script setup lang="ts">
import type { LocationCoords, WeatherApiParsedResponse } from '@/types'
import { ref } from 'vue'

interface Props {
  weatherData: WeatherApiParsedResponse
  coords: LocationCoords
}

defineProps<Props>()

const expand = ref<boolean>(false)
</script>

<template>
  <div>
    <v-row>
      <v-col align="center">
        <div class="text-overline">{{ coords.name }}</div>
        <div class="text-caption">{{ weatherData.location }}</div>
      </v-col>
    </v-row>

    <v-row align="center" class="text-center justify-center">
      <v-col class="text-h1" cols="12" sm="auto">
        {{ weatherData.current.temp }}{{ weatherData.tempUnit }}
      </v-col>

      <v-col class="text-start d-flex flex-column" cols="6" sm="auto">
        <v-tooltip
          v-for="condition in weatherData.current.conditions"
          density="compact"
          :key="condition.condition"
          :title="condition.condition"
          :text="condition.condition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="bg-transparent justify-sm-start text-medium-emphasis text-body-2"
              flat
              v-bind="props"
              :prepend-icon="condition.icon"
              >{{ condition.value }}</v-btn
            >
          </template>
        </v-tooltip>
      </v-col>
    </v-row>

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
      <div v-if="expand" class="mt-4 text-center">
        <v-divider></v-divider>

        <v-container
          class="mx-auto d-flex flex-column flex-sm-row flex-wrap justify-center align-center"
        >
          <v-card
            v-for="item in weatherData.daily"
            :key="item.day"
            class="w-130 bg-transparent"
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
      </div>
    </v-expand-transition>
  </div>
</template>
