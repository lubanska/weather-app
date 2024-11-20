<script setup lang="ts">
import { useGeocoding } from '@/composables/useGeocoding'
import { useWeatherForecast } from '@/composables/useWeatherForecast'

import type { LocationGeocodingData } from '@/types'
import { ref } from 'vue'

const searchQuery = ref<string>('')

const { locationData } = useGeocoding(searchQuery)
const { updateCoords } = useWeatherForecast()

const handleModel = (value: LocationGeocodingData | null) => {
  if (value) {
    updateCoords({ name: value.title, lat: value.lat, long: value.long })
  } else {
    updateCoords({
      name: 'Copenhagen, Capital Region, Denmark',
      lat: 55.67594,
      long: 12.56553,
    })
  }
}

const handleSearch = (value: string | null) => {
  searchQuery.value = value ?? ''
}
</script>

<template>
  <v-autocomplete
    clearable
    return-object
    auto-select-first
    no-filter
    flat
    hide-details
    label="Location"
    :items="locationData ?? []"
    item-title="title"
    item-value="value"
    variant="solo-filled"
    @update:model-value="handleModel($event)"
    @update:search="handleSearch($event)"
  ></v-autocomplete>
</template>
