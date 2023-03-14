import { useModalStore } from '~/stores/modalStore'

export default function useModal () {
  const modalStore = useModalStore()

  return {
    open: modalStore.open,
    close: modalStore.close,
    listen (fn: Function) {
      modalStore.$subscribe(fn)
    },
    off (fn: Function) {
      modalStore.$unsubscribe(fn)
    }
  }
}
