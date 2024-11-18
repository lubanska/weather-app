<script setup lang="ts">
import { useGeocoding } from '@/composables/useGeocoding'
import type { LocationGeocodingData } from '@/types'
import { ref } from 'vue'

const emits = defineEmits(['update:coords'])

const coordinates = ref({ name: '', lat: 0, long: 0 })

const searchQuery = ref<string>('')

const { locationData } = useGeocoding(searchQuery)

const handleModel = (value: LocationGeocodingData | null) => {
  if (value) {
    coordinates.value = { name: value.title, lat: value.lat, long: value.long }
  } else {
    coordinates.value = { name: '', lat: 0, long: 0 }
  }

  emits('update:coords', coordinates.value)
}

const handleSearch = (value: string | null) => {
  searchQuery.value = value ?? ''
}
</script>

<template>
  <div>
    <v-autocomplete
      clearable
      return-object
      auto-select-first
      no-filter
      label="Autocomplete"
      :items="locationData ?? []"
      item-title="title"
      item-value="value"
      @update:model-value="handleModel($event)"
      @update:search="handleSearch($event)"
    ></v-autocomplete>
  </div>
</template>
