<!-- <script setup lang="ts">
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'

// defineComponent({
//   Loading,
//   Copy,
//   ChevronDown
// })

function fhan(evt) {
  console.log(evt);
}

const props = defineProps({
  name: { type: String, required: true }
})

console.log(' *******',
  props)
</script>

<template>
  <component :is="fhan" v-bind="props" />
</template> -->
<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'

export default {
  components: { Loading, Copy, ChevronDown },
  props: {
    name: { type: String, required: true }
  }
}
</script>
