import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'
import { useGlobal } from '~/stores/global'


export interface HttpClientInterface {
  get<T> (url: string, params?: any): Promise<AxiosResponse<T>>
  post<T> (url: string, body: any): Promise<AxiosResponse<T>>
}


class HttpClient implements HttpClientInterface {
  private axios = axios.create({
    /* #TODO dynamic URL based on env*/
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {}
  });

  constructor() {
    this.axios.interceptors.request.use((config: any) => {
      const globalState = useGlobal()
      globalState.setGlobalLoading(true)

      const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
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

        if (error.response.status === 401) {
          useRouter().push('/')
          throw new Error(error.message)
        }

        const globalState = useGlobal()
        globalState.setGlobalLoading(false)
        return error
      }
    )
  }

  async get<T> (url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.axios.get(url, params)
  }

  async post<T> (url: string, body: any): Promise<AxiosResponse<T>> {
    return this.axios.post(url, body)
  }
}

const httpClient = new HttpClient()

export default httpClient
