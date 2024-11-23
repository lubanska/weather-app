<template>
  <div class="card-loader">
    <v-row>
      <v-col align="center">
        <v-skeleton-loader type="text" class="w-500"></v-skeleton-loader>
        <v-skeleton-loader type="text" class="w-200"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-skeleton-loader type="image" class="mb-5"></v-skeleton-loader>

    <v-skeleton-loader type="divider"></v-skeleton-loader>

    <v-skeleton-loader type="chip" class="justify-center min-w-200"></v-skeleton-loader>
  </div>
</template>
