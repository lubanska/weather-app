<script setup lang="ts"></script>

<template>
  <v-icon
    v-if="weatherData.current.isDay"
    class="me-1 pb-1"
    icon="mdi-white-balance-sunny"
    size="18"
  ></v-icon>

  <v-icon v-else class="me-1 pb-1" icon="mdi-weather-night" size="18"></v-icon>
</template>
