<script setup lang="ts">
import { getSPDate } from '~/utils/date'
import ModalFactory from '~/components/ModalFactory/index.vue'

console.log(' 🔴 toast', this.$toast)

// const { BASE_URL, PORT, API_PORT, API_KEY, } = process.env
// console.log('*****app.vue env', BASE_URL, PORT, API_PORT, API_KEY,)
// const runtimeCfg = useRuntimeConfig()
// console.log('=====app.vue runtimeCfg', runtimeCfg);
useHead({ title: `Feedbacker | ${getSPDate()}`, })
</script>

<template>
  <div>
    <!-- https://nuxt.com/docs/getting-started/views -->
    <ModalFactory />
    <NuxtPage />
  </div>
</template>
