<template>
  <teleport to="body">
    <div v-if="modal.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToogle({ status: false })">
      <div class="fixed mx-10" :class="modal.width" @click.stop>
        <div
          class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="modal.component" />
          </div>
        </div>

      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
// import { onBeforeUnmount, onMounted } from 'vue'
import ModalAccountCreate from '~/components/ModalCreateAccount/index.vue'
import ModalLogin from '~/components/ModalLogin/index.vue'

const modal = useModal()

onMounted(() => {
  modal.listen(handleModalToogle)
})

onBeforeUnmount(() => {
  modal.off(handleModalToogle)
})

function handleModalToogle (mutationObject: any, state: any) {
  console.log(' 🟡 handleModalToogle:',)

  const analyzedValue = mutationObject.events.newValue // através do $subscribe do pinia
  // const analyzedValue = state.payload // através do useModalStore

  if (analyzedValue.status) {
    modal.component = analyzedValue.component
    modal.props = analyzedValue.props
    modal.width = analyzedValue.width || modal.store.getDefaultModalWidth
  } else {
    /* reseta o bagui ??? */
    modal.component = {}
    modal.props = {}
    modal.width = modal.store.getDefaultModalWidth
  }

  modal.isActive = analyzedValue.status
}

</script>
