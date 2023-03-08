import axios from 'axios'

import AuthService from './auth'
import FeedbacksService from './feedbacks'
import UsersService from './users'

/* states stores */
const globalState = useGlobal()

/* composables */
const router = useRouter()

/* constants */
const API_ENVS = {
  production: '', //#TODO api env prd
  development: '', //#TODO api env dev
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  globalState.setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    globalState.setGlobalLoading(false)
    return response
  },
  (error) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      globalState.setGlobalLoading(false)
      throw new Error(error.message)
    }

    if (error.response.status === 401) {
      router.push('/')
    }

    globalState.setGlobalLoading(false)
    return error
  }
)


export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
