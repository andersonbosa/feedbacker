import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive } from 'vue'
import { UserInitialState } from '~/lib/types'

// const userInitialState: UserInitialState = {
//   currentUser: {}
// }

const userInitialState: any = {
  currentUser: {}
}

export const useUserStore: any = defineStore('userStore', {

  /* TOFIX nao sei se da boa com reactive */
  // state: () => reactive({
  //   currentUser: userInitialState.currentUser
  // }),

  state: () => userInitialState,

  getters: {
  },

  actions: {
    resetUserStore () {
      // this.$reset()
      this.state = userInitialState
    },

    cleanCurrentUser () {
      this.currentUser = userInitialState.currentUser
    },

    setCurrentUser (user: object) {
      /* TODO currentUser interface */
      console.log('********************** setCurrentUser', user)

      this.currentUser = user
    },

    setApiKey (apiKey: string) {
      const currentUser = { ...this.currentUser, apiKey }
      this.currentUser = currentUser
    }
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
