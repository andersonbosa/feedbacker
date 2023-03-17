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

const closedState = {
  status: false,
  isActive: false,
}

const initialModalState = {
  ...closedState,
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
    open (config = {}) {
      this.status = true
      this.isActive = true
      Object.assign(this, config)
    },

    close (config = {}) {
      this.status = false
      this.isActive = false
      Object.assign(this, config)
    }
  }
})



if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useModalStore, import.meta.hot)
  )
}
