import { acceptHMRUpdate, defineStore } from 'pinia'

interface IModal {
  status: boolean
  payload: any
  isActive: boolean
  component: any
  props: object
  width: string
}

const DEFAULT_MODAL_WIDTH = 'w-3/4 lg:w-1/3'

const initialModalState = {
  status: false,
  payload: {},

  isActive: false,
  component: {},
  props: {},
  width: DEFAULT_MODAL_WIDTH
}

export const useModalStore: any = defineStore('modalStore', {
  state: () => (initialModalState as IModal),

  getters: {
    getDefaultModalWidth () {
      return DEFAULT_MODAL_WIDTH
    }
  },

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
