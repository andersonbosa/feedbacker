import { useModalStore } from '~/stores/modalStore'
import ModalLogin from '~/components/ModalLogin/index.vue'
import ModalCreateAccount from '~/components/ModalCreateAccount/index.vue'

/*
NOTES considerações useModel e useModaLStore

REVIEW refactor

*/

// const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  const modalStore = useModalStore()
  
  return {
    store: modalStore,

    open: modalStore.open,

    close: modalStore.close,

    configs: {

      createSignUpModal (props = {}) {
        return {
          props,
          width: modalStore.getDefaultModalWidth,
          component: ModalCreateAccount,
        }
      },

      createLoginModal (props = {}) {
        return {
          props,
          width: modalStore.getDefaultModalWidth,
          component: ModalLogin,
        }
      }
    },

    // https://pinia.vuejs.org/core-concepts/actions.html#subscribing-to-actions
    listen (fnHandler: Function) {
      modalStore.$subscribe(fnHandler)
    },

    /* TOFIX */
    // off (fnHandler: Function) {
    //   modalStore.$unsubscribe(fnHandler)
    // },

    isHidden () {
      return modalStore.isActive === false
    }
  }
}
