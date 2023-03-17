<script setup lang="ts">
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'

const _KNOW_COMPONENTS = [Loading, Copy, ChevronDown]

defineProps({
  name: { type: String, required: true }
})

</script>

<template>
  <component :is="name" v-bind="$props" />
</template>
