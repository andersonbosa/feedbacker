<template>
  <teleport to="body">
    <div v-if="modal.store.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalClick">
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

const handleEsc = () => {
  modal.hideModal()
}


function handleModalClick (evt: any) {
  console.log(' * handleModalClick ', modal)
  if (modal.isHidden) {
    return
  }

  modal.hideModal()
  // modal.close() // REVIEW
}


onMounted(() => {
  window.addEventListener('keydown', handleEsc)

  /* testando subscribe direto */
  // modal.listen(showModalHandler) // REVIEW
  // modal.store.$subscribe(showModalHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)

  // modal.off(showModalHandler) // REVIEW
  // modal.store.$unsubscribe(open)
})

</script>
