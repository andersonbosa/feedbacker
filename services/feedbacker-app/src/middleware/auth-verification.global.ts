import { useUserContext } from '~/stores/userContext'
import services from '~/utils/services'

/* Middleware demonstration */
export default defineNuxtRouteMiddleware(
  async (to, from) => {
    // const response = await services.users.getMe()
    // const isUserAuthenticated = response.etc.jwtToken

    // if (!isUserAuthenticated) {
    //   console.log(`🔵 Running auth-verification: userContext.isAuthenticated`)
    //   return navigateTo('/login')
    // }

    // const userContext = useUserContext()
    // userContext.setToken(isUserAuthenticated)
  }
)
