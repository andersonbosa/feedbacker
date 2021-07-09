require('dotenv').config()

const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('koa-jwt')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

const database = require('./database')
const CreateUserHandler = require('./handlers/users')
const CreateAuthHandler = require('./handlers/auth')
const CreateFeedbackHandler = require('./handlers/feedbacks')
const CreateApiKeyHandler = require('./handlers/apikey')

const app = new Koa()
const router = new Router()

function isProduction () {
  return process.env.environment === 'production' ? 'production' : 'development'
}

const API_ENVIRONMENT = isProduction()
const API_JWT_SECRETKEY = process.env.API_JWT_SECRETKEY || 'rip'
const API_DOMAIN = process.env.API_DOMAIN || 'localhost'
const API_PORT = process.env.API_PORT || 3000

const authMiddleware = jwt({ secret: API_JWT_SECRETKEY })

app.use(bodyParser())
app.use(cors())

const feedbacksHandler = CreateFeedbackHandler(database)
const usersHandler = CreateUserHandler(database)
const authHandler = CreateAuthHandler(database)
const apiKeyHandler = CreateApiKeyHandler(database)

router.get('/', (ctx) => {
  ctx.status = 200
  ctx.body = { message: new Date() }
})
router.head('/apikey/exists', apiKeyHandler.checkIfApiKeyExists)
router.post('/auth/register', usersHandler.create)
router.post('/auth/login', authHandler.login)
router.get('/users/me', authMiddleware, usersHandler.getLoggerUser)
router.post('/users/me/apikey', authMiddleware, usersHandler.generateApiKey)
router.get('/feedbacks', authMiddleware, feedbacksHandler.getFeedbacks)
router.post('/feedbacks', feedbacksHandler.create)
router.get('/feedbacks/summary', authMiddleware, feedbacksHandler.getSummary)
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(API_PORT, () => {
  console.log(`API Server running in "${API_ENVIRONMENT}" at "http://${API_DOMAIN}:${API_PORT}"`)
})

module.exports = app
