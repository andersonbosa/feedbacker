import { acceptHMRUpdate, defineStore } from 'pinia'
import { IFilter } from '~/lib/types'

const filterSample: IFilter = {
  active: undefined,
  amount: undefined,
  type: undefined,
  label: undefined,
  color: { text: undefined, bg: undefined },
}

export const feedbacksStore = defineStore('feedbacks', {
  state: () => ({
    isLoadingFeedbacks: false,
    isLoadingMoreFeedbacks: false,
    isLoadingMoreFeedback: false,
    feedbacks: [],
    currentFeedbackType: '',
    filters: [
      filterSample
    ],
    pagination: {
      limit: 5,
      offset: 0,
      total: 0
    },
  }),

  getters: {
  },

  actions: {
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(feedbacksStore, import.meta.hot))
}
