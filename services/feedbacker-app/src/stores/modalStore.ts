import { acceptHMRUpdate, defineStore } from 'pinia'

export const useModalStore: any = defineStore('modal', {
  state: () => ({
    status: false,
    payload: {}
  }),

  actions: {
    open (payload = {}) {
      this.status = true
      this.payload = payload
    },
    close (payload = {}) {
      this.status = false
      this.payload = payload
    }
  }
})



if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useModalStore, import.meta.hot)
  )
}
