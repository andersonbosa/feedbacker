import { acceptHMRUpdate, defineStore } from 'pinia'
import { decodeJWT } from '~/utils/common'

// const userInitialState: UserInitialState = {
//   loggedUser: {}
// }

const userInitialState: any = {
  loggedUser: {},
  token: undefined,
  apiKey: undefined,
}

export const useUserStore: any = defineStore('userStore', {
  state: () => userInitialState,

  getters: {
  },

  actions: {
    resetUserStore () {
      this.$reset()
      // this.state = userInitialState
    },

    cleanCurrentUser () {
      this.loggedUser = userInitialState.loggedUser
    },

    setJWT (token: string) {
      /* TODO loggedUser interface */
      const { payload } = decodeJWT(token)
      this.setUser(payload)
      this.token = token
    },

    setUser (user: object | string) {
      /* TODO loggedUser interface */

      this.loggedUser = user
    },

    setApiKey (apiKey: string) {
      const loggedUser = { ...this.loggedUser, apiKey }
      this.loggedUser = loggedUser
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
