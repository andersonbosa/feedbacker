import axios from 'axios'
import { useGlobal } from '~/stores/global'

const globalState = useGlobal()
// const router = useRouter()


const authorizationHeader = {
  name: 'Authorization',
  prefix: 'Bearer'
}

// https://axios-http.com/docs/instance
const axiosConfig = {
  /* #TODO dynamic URL based on env*/
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    [authorizationHeader.name]: ''
  }
}

const httpClient = axios.create(axiosConfig)

httpClient.interceptors.request.use(
  _config => {
    globalState.setGlobalLoading(true)

    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    if (token) {
      _config.headers = Object.assign(_config.headers, {
        [authorizationHeader.name]: `${authorizationHeader.prefix} ${token}`
      })
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
    const canThrowAnError = _error.request.status === 0 || _error.request.status === 500

    if (canThrowAnError) {
      globalState.setGlobalLoading(false)
      throw new Error(_error.message)
    }

    if (_error.response.status === 401) {
      // router.push('/')
      // navigateTo('/feedbacks')
      // window.location.pathname = '/'
      throw 'to implement: go to home'
    }

    globalState.setGlobalLoading(false)
    return _error
  }
)

export default httpClient
