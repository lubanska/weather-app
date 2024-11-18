<script setup lang="ts">
import { useGeocoding } from '@/composables/useGeocoding'
import { ref } from 'vue'

const emits = defineEmits(['update:coords'])

// bind the value of the autocmplete to the ref
const coordinates = ref({ lat: 0, long: 0 })

// bind the user input to the ref
const searchQuery = ref<string>('Berlin')

const { locationData, error, isLoading } = useGeocoding(searchQuery)

const handleFocus = () => {
  // console.log('focused')
}

const handleModel = (value: string | null) => {
  console.log('model', value)

  const selectedLocation = locationData.value?.find((location) => location.value === value)

  if (selectedLocation) {
    coordinates.value = {
      lat: selectedLocation.lat,
      long: selectedLocation.long,
    }
  } else {
    coordinates.value = { lat: 0, long: 0 }
  }

  emits('update:coords', coordinates.value)
}

const handleSearch = (value: string | null) => {
  // console.log('search', value)
}
</script>

<template>
  <div>
    <v-autocomplete
      clearable
      label="Autocomplete"
      :items="locationData ?? []"
      @update:focused="handleFocus"
      @update:model-value="handleModel($event)"
      @update:search="handleSearch($event)"
    ></v-autocomplete>
  </div>
</template>
