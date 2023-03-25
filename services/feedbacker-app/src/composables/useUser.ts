import { User } from '~/lib/types'
import { useUserStore } from '~/stores/userStore'
import { setClientAuthToken } from '~/utils/common'
import services from '~/utils/services'


const { toast } = useNotification()

/**
 * facilitação na importação da store
 * é useUser é um invólucro que recebe "autoimport" do nuxt3
 * em um projeto vue puro seria o mesmo que colocar as funções nas actions, e demais atributos
 * direto na store useUserStore
 */
export default function useUser () {
  const userStore = useUserStore()

  console.log('👩‍🦰 useUser')
  return {
    store: userStore,

    async setUserIdentityByToken (jwt: string) {
      setClientAuthToken(jwt)

      const { data } = await services.users.getMe()
      if (data?.id && data?.name) {
        useUser().loginByToken(data)
        return
      }
    },

    loginByToken (user: User) {
      this.store.setUser(user)
    },

    welcomeUser () {
      toast.success(`Bem vind@, ${this.store.getUserFirstName}!`)
      useModal().close()
      useRouter().push('/feedbacks')
    },
  }
}
