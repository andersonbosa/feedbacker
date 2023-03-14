<script setup lang="ts">
// const { BASE_URL, PORT, API_PORT, API_KEY, } = process.env
// console.log('*****app.vue env', BASE_URL, PORT, API_PORT, API_KEY,)
// const runtimeCfg = useRuntimeConfig()
// console.log('=====app.vue runtimeCfg', runtimeCfg);
import ModalFactory from '~/components/ModalFactory/index.vue'
</script>

<template>
  <section>
    <!-- https://nuxt.com/docs/getting-started/views -->
    <ModalFactory />
    <NuxtPage />
  </section>
</template>
