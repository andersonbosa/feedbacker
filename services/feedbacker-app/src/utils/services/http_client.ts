import axios from 'axios'
import { useGlobal } from '~/stores/global'

// const { API_KEY = undefined } = useRuntimeConfig()

const globalState = useGlobal()
// const router = useRouter()

const authorizationHeaderName = 'Authorization'

// https://axios-http.com/docs/instance
const axiosConfig = {
  baseURL: 'http://localhost:3000', /* #TODO dynamic URL based on env*/
  timeout: 1000,
  headers: {
    common: {
      [authorizationHeaderName]: ''
    }
  }
}

const httpClient = axios.create(axiosConfig)

httpClient.interceptors.request.use(
  _config => {
    globalState.setGlobalLoading(true)
    const token = window.localStorage.getItem('token')

    if (token) {
      console.log('===== token')
      console.log(token)

      _config.headers.common.Authorization = `Bearer ${token}`
    }

    return _config
  }
)

httpClient.interceptors.response.use(
  (_response) => {
    globalState.setGlobalLoading(false)
    return _response
  },
  (_error) => {
    console.log('======= error', _error)

    const canThrowAnError = _error.request.status === 0 || _error.request.status === 500

    if (canThrowAnError) {
      globalState.setGlobalLoading(false)
      throw new Error(_error.message)
    }

    if (_error.response.status === 401) {
      // router.push('/')
      throw 'to implement'
    }

    globalState.setGlobalLoading(false)
    return _error
  }
)

export default httpClient
