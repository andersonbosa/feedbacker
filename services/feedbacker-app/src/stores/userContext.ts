import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserInitialState } from '~/lib/types'

const userMock: UserInitialState = {
  currentUser: {
    name: "Anderson"
  }
}


const userInitialState: UserInitialState = {
  currentUser: {
    ...userMock.currentUser
  }
}


export const useUserContext = defineStore('userContext', {
  state: () => ({
    ...userInitialState
  }),

  getters: {
  },

  actions: {
    resetUserStore () {
      this.$reset()
      // this = {} // wont work
    },

    cleanCurrentUser () {
      this.currentUser = {}
    },

    setCurrentUser (user: object/* TODO currentUser interface */) {
      this.currentUser = user
    },

    setApiKey (apiKey: string) {
      const currentUser = { ...this.currentUser, apiKey }
      this.currentUser = currentUser
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserContext, import.meta.hot))
}
