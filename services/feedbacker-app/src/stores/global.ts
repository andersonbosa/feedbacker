import { acceptHMRUpdate, defineStore } from 'pinia'

/* REFACTOR ModalLogin require */
const initialState = {
  isLoading: false,
  hasErrors: false,
  email: { errorMessage: '', value: '' }, /* REVIEW usado em campos INPUT do modal  */
  password: { errorMessage: '', value: '' },  /* REVIEW usado em campos INPUT do modal  */
}

export const useGlobalStore = defineStore('globalStore', {
  state: () => initialState,

  getters: {
  },

  actions: {
    setGlobalLoading (status: boolean) {
      const isBoolean = typeof status === 'boolean'
      if (!isBoolean) {
        throw new Error('Wrong type on #setGlobalLoading')
      }

      this.isLoading = status
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
