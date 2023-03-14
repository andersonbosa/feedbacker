import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'
import { useGlobal } from '~/stores/global'


export interface HttpClientInterface {
  get<T> (url: string, params?: any): Promise<AxiosResponse<T>>
  post<T> (url: string, body: any): Promise<AxiosResponse<T>>
}

const httpClient = axios.create({
  /* #TODO dynamic URL based on env*/
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {}
})

httpClient.interceptors.request.use((config: any) => {
  const globalState = useGlobal()
  globalState.setGlobalLoading(true)

  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response: any) => {
    const globalState = useGlobal()
    globalState.setGlobalLoading(false)
    return response
  },
  (error: any) => {
    const canThrowAnError = error.request.status === 0 || error.request.status === 500

    if (canThrowAnError) {
      const globalState = useGlobal()
      globalState.setGlobalLoading(false)

    }

    /* TOFIX http_client.ts:45 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'status') */
    if (error.response.status === 401) {
      useRouter().push('/')
      throw new Error(error.message)
    }

    const globalState = useGlobal()
    globalState.setGlobalLoading(false)
    return error
  }
)

export default httpClient
