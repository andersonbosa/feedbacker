import { defineStore, acceptHMRUpdate } from 'pinia'


export const useFeedbacks = defineStore('feedbacks', {
  state: () => ({
    isLoadingFeedbacks: false,
    isLoadingMoreFeedbacks: false,
    isLoadingMoreFeedback: false,
    feedbacks: [],
    currentFeedbackType: '',
    pagination: {
      limit: 5,
      offset: 0,
      total: 0
    },
    hasError: false
  }),

  getters: {
  },

  actions: {
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFeedbacks, import.meta.hot))
}
