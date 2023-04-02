import { acceptHMRUpdate, defineStore } from 'pinia'
import { User } from '~/lib/types'
import { decodeJWT } from '~/utils/common'

interface UserStore {
  user: User | undefined
  token: string | undefined
}

const userInitialState = {
  user: undefined,
  token: undefined
}

export const useUserStore: any = defineStore('userStore', {
  state: (): UserStore => userInitialState,

  getters: {
    getUserFirstName (): string {
      const firstName = this.user?.name?.split(' ')?.[0]
      if (!firstName) {
        throw new Error('Error on #getUserFirstName')
      }

      return firstName
    },

    getUserApiKey (): string {
      return this?.user?.apiKey || 'Something wrong'
    }
  },

  actions: {
    setApiKey (apiKey: string) {
      this.$patch((state) => {
        state.apiKey = apiKey
      })
    },

    setToken (token: string) {
      this.$patch((state) => {
        state.token = token
      })
    },

    setUser (user: User) {
      if (!user) {
        /* TODO emitir error */
        throw new Error('ERROR_CODE: 7577f4f9-4edd-55d1-b17e-f6be18016f67')
      }

      this.$patch((state) => {
        state.user = user
      })
    },

    resetUserStore () {
      this.$reset()
      // this.state = userInitialState
    },

    setJWT (token: string) {
      const { payload } = decodeJWT(token)
      if (!payload) {
        throw new Error('ERROR_CODE: 5a04e1a9-11ef-59dc-86d1-3b6348fe88cf')
      }

      this.setUser(payload as User)
      this.$patch((state) => {
        state.token = token
      })
    },
  }
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
