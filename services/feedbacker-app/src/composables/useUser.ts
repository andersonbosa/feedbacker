import { useUserStore } from '~/stores/userStore'


export default function useUser () {
  const modalStore = useUserStore()

  console.log(' 🟢 useUser', modalStore)
  return {
    store: modalStore,

    open: modalStore.open,
    close: modalStore.close,
    listen (fn: Function) {
      modalStore.$subscribe(fn)
      // modalStore.$subscribe((mutation, state) => {
      //   // import { MutationType } from 'pinia'
      //   // mutation.type // 'direct' | 'patch object' | 'patch function'
      //   // same as cartStore.$id
      //   // mutation.storeId // 'cart'
      //   // only available with mutation.type === 'patch object'
      //   // mutation.payload // patch object passed to cartStore.$patch()
      //   // persist the whole state to the local storage whenever it changes
      //   localStorage.setItem('modal:listen', JSON.stringify(state))
      // })
    },
    off (fn: Function) {
      modalStore.$unsubscribe(fn)
    }
  }
}
