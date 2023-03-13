import httpClient from './http_client'
import AuthService from './auth'
import FeedbacksService from './feedbacks'
import UsersService from './users'


console.log('🟢 Using services')


export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
