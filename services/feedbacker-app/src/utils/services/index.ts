import httpClient from './http_client'
import AuthService from './auth'
import FeedbacksService from './feedbacks'
import UsersService from './users'

// const httpClient = undefined

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
