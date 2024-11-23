<script setup lang="ts">
interface Props {
  error: string
}

defineProps<Props>()
</script>

<template>
  <div class="card-error">
    <v-row>
      <v-col align="center">
        <div class="text-overline text-error">Error</div>
        <div class="text-caption text-error">{{ error }}</div>
      </v-col>
    </v-row>
  </div>
</template>
