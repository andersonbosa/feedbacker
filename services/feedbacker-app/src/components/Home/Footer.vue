<script setup lang="ts">
    const currentDate = new Date().getFullYear()

</script>

<template>
  <footer>
    <div class="flex justify-center py-10 bg-brand-gray">
      <p class="font-medium text-center text-gray-800">
        feedbacker © 2022 - {{ currentDate }}
      </p>
    </div>
  </footer>
</template>
