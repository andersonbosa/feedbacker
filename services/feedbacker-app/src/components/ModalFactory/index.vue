<template>
  <teleport to="body">
    <div v-if="modal.store.isActive" help="ISSO É O FUNDO DO MODAL"
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
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  defineAsyncComponent,
} from 'vue'
console.log('EU SOU MODAL FACTORY')
/*
NOTES MODAL FACTORY SEMPRE ESCUTANDO

modal
  ENTÃO
    A função `modal.setConfig(configName)`
      Centraliza as mudanças na máquina de estado `modal`
      `useModal()` permite acesso de qualquer lugar a máquina de estado `modal`

*/

// const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
// const ModalAccountCreate = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'
const modal = useModal()
const state = modal.store

// const state = reactive({
//   isActive: false,
//   component: {},
//   props: {},
//   width: DEFAULT_WIDTH
// })

onMounted(() => {
  // modal.listen(handleModalClose)
})

onBeforeUnmount(() => {
  console.log(' 😀 modal.off')

  // modal.off(handleModalClose)
})

function handleModalClose (payload: any) {
  console.log(' 😀 handleModalClose  payload', payload)
  modal.store.isActive = !modal.store.isActive

  // if (payload.status) {
  //   modal.store.component = payload.component
  //   modal.store.props = payload.props
  //   modal.store.width = payload.width ?? DEFAULT_WIDTH
  // } else {
  //   modal.store.component = {}
  //   modal.store.props = {}
  //   modal.store.width = DEFAULT_WIDTH
  // }
}
</script>
