<script setup lang="ts">
import type { LocationGeocodingData } from '@/types/appTypes'
import { useGeocoding, useOpenMeteo } from '@/composables'
import { ref } from 'vue'

const searchQuery = ref<string>('')

const { locationData } = useGeocoding(searchQuery)
const { updateCoords } = useOpenMeteo()

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
    id="inputAutocomplete"
    label="Location"
    item-title="title"
    item-value="value"
    variant="solo-filled"
    :items="locationData ?? []"
    @update:model-value="handleModel($event)"
    @update:search="handleSearch($event)"
  ></v-autocomplete>
</template>
