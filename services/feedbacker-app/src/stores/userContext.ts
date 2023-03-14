import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive } from 'vue'
import { UserInitialState } from '~/lib/types'

const userInitialState: UserInitialState = {
  currentUser: {}
}

export const useUserContext: any = defineStore('userContext', {
  state: () => reactive({
    currentUser: userInitialState.currentUser
  }),

  getters: {
  },

  actions: {
    resetUserStore () {
      // this.$reset()
      this.state = reactive(userInitialState)
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
