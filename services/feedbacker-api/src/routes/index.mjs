import Router from '@koa/router'
import jwt from 'koa-jwt'
import databaseClient from '../database/index.mjs'
import { CreateApiKeyHandler } from '../handlers/apikey.mjs'
import { CreateAuthHandler } from '../handlers/auth.mjs'
import { CreateFeedbackHandler } from '../handlers/feedbacks.mjs'
import { CreateUserHandler } from '../handlers/users.mjs'


const { JWT_API_SECRET } = process.env


/* initialize handlers */
const feedbacksHandler = CreateFeedbackHandler(databaseClient)
const usersHandler = CreateUserHandler(databaseClient)
const authHandler = CreateAuthHandler(databaseClient)
const apiKeyHandler = CreateApiKeyHandler(databaseClient)


/* router definitions */
const router = new Router()

router.get('/healthcheck', async (ctx) => {
  ctx.status = 200
  ctx.body = { alive: true, message: new Date }
})

/* Public resources */
router.post('/auth/register', usersHandler.create)
router.post('/auth/login', authHandler.login)
router.post('/feedbacks', feedbacksHandler.create)
router.head('/apikey/exists', apiKeyHandler.checkIfApiKeyExists)

/* Secured resources */
const authMiddleware = jwt({ secret: JWT_API_SECRET })
router.get('/users/me', authMiddleware, usersHandler.getLoggerUser)
router.post('/users/me/apikey', authMiddleware, usersHandler.generateApiKey)
router.get('/feedbacks', authMiddleware, feedbacksHandler.getFeedbacks)
router.get('/feedbacks/summary', authMiddleware, feedbacksHandler.getSummary)


export default router
