import { acceptHMRUpdate, defineStore } from 'pinia'

/* REFACTOR ModalLogin require some vars */
const initialStoreState = {
  email: {
    errorMessage: '',
    value: ''
  },
  hasErrors: false,
  isLoading: false,
  password: {
    errorMessage: '',
    value: ''
  },
  filters: [
    { label: null, amount: null }
  ]
}


export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    ...initialStoreState
  }),

  getters: {
  },

  actions: {
    setGlobalLoading (status: boolean) {
      this.isLoading = status
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
