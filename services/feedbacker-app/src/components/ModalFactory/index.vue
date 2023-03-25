<template>
  <teleport to="body">
    <div v-if="modal.store.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalClose">
      <div class="fixed mx-10" :class="modal.store.width" @click.stop>
        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="modal.store.component" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const modal = useModal()

function handleModalClose () {
  modal.close()
}

/*
NOTES MODAL FACTORY SEMPRE ESCUTANDO
modal
  ENTÃO
    A função `modal.setConfig(configName)`
      Centraliza as mudanças na máquina de estado `modal`
      `useModal()` permite acesso de qualquer lugar a máquina de estado `modal`
*/
// onMounted(() => {
/* TODO: study how to use listen/$subscribe from `pinia`? */
//   modal.listen(handleComponentUpdate)
// })

// function handleComponentUpdate (mutationObject: any) {
//   const expectedEventUpdate = mutationObject?.events?.key === 'component'
//   console.log(' 🔴 handleComponentUpdate', expectedEventUpdate, modal)
// }
</script>
