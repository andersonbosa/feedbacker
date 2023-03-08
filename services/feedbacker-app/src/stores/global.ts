import { FilterInterface } from './../utils/interfaces'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGlobal = defineStore('global', {
  state: () => ({
    isLoading: false,
    filters: [
      { label: null, amount: null }
    ]
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
  import.meta.hot.accept(acceptHMRUpdate(useGlobal, import.meta.hot))
}
