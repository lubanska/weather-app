<script setup lang="ts">
import IconDayNight from './IconDayNight.vue'
import InputAutocomplete from './InputAutocomplete.vue'
</script>

<template>
  <v-app-bar flat height="72" class="bg-surface-light">
    <v-container class="mx-auto d-flex flex-wrap justify-center align-center">
      <IconDayNight class="mr-4" />

      <v-app-bar-title class="d-none d-sm-flex">Weather App</v-app-bar-title>

      <v-spacer class="d-none d-md-flex"></v-spacer>

      <v-responsive width="240">
        <InputAutocomplete />
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>
