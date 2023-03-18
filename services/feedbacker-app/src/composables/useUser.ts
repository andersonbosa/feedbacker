import { useUserStore } from '~/stores/userStore'
import { authorizeUser, cleanClientAuthToken, welcomeUser } from '~/utils/common'


export default function useUser () {
  console.log(' 🟢 useUser')
  return {
    ...useUserStore(),

    register () {

    },

    async login (token: string) {
      authorizeUser(token)
      welcomeUser(token)
    },

    async logout () {
      console.log(' logout')
      cleanClientAuthToken()

      this.$reset()
    }
  }
}
