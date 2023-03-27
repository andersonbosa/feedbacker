import { acceptHMRUpdate, defineStore } from 'pinia'

/* REFACTOR ModalLogin require */
const initialState = {
  isLoading: false,
  hasErrors: false,
  email: { errorMessage: '', value: '' }, /* REVIEW é coisa do input...*/
  password: { errorMessage: '', value: '' },
}

export const useGlobalStore = defineStore('globalStore', {
  state: () => initialState,

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
