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
        {{ weatherData.current.temp }}{{ weatherData.tempUnit }}
      </v-col>

      <v-col class="text-start" cols="5" sm="auto">
        <v-list-item
          v-for="condition in weatherData.current.conditions"
          density="compact"
          :prepend-icon="condition.icon"
        >
          <v-list-item-subtitle>
            {{ condition.value }}
          </v-list-item-subtitle>
        </v-list-item>
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
