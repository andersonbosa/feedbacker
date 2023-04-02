// import { useUserStore } from '~/stores/userStore'
// import services from '~/utils/services'

/* Middleware demonstration */
export default defineNuxtRouteMiddleware(
  async (to, from) => {
    console.log(`🔵 Running auth-verification: userContext.isAuthenticated`)
    useAuth().tryPersistUserByLocalStorage()


    // const response = await services.users.getMe()
    // const isUserAuthenticated = response.etc.jwtToken

    // if (!isUserAuthenticated) {
    //   return navigateTo('/login')
    // }

    // const userContext = useUserStore()
    // userContext.setToken(isUserAuthenticated)
  }
)
