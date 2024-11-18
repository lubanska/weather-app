<script setup lang="ts">
import { useGeocoding } from '@/composables/useGeocoding'
import type { LocationGeocodingData } from '@/types'
import { ref } from 'vue'

const emits = defineEmits(['update:coords'])

// bind the value of the autocmplete to the ref
const coordinates = ref({ lat: 0, long: 0 })

// bind the user input to the ref
const searchQuery = ref<string>('Berlin')

const { locationData, error, isLoading } = useGeocoding(searchQuery)

const handleModel = (value: LocationGeocodingData | null) => {
  if (value) {
    coordinates.value = { lat: value.lat, long: value.long }
  } else {
    coordinates.value = { lat: 0, long: 0 }
  }

  emits('update:coords', coordinates.value)
}

const handleSearch = (value: string | null) => {
  console.log('search', value)

  searchQuery.value = value ?? ''
}
</script>

<template>
  <div>
    <v-autocomplete
      clearable
      return-object
      label="Autocomplete"
      :items="locationData ?? []"
      @update:model-value="handleModel($event)"
      @update:search="handleSearch($event)"
    ></v-autocomplete>
  </div>
</template>
