import './config/loadEnv.mjs'

import cors from '@koa/cors'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import router from './routes/index.mjs'

const { PORT = 3001 } = process.env


/* initialize Koa */
const koaApp = new Koa()

/* setup default middlewares */
koaApp.use(cors())
koaApp.use(koaBody({
  jsonLimit: '5MB'
}))


/* Using the routes from the router.mjs file. */
koaApp.use(router.routes())
koaApp.use(router.allowedMethods())


/* Listening for the server to start. */
koaApp.listen(PORT, _listeningListener => {
  console.log(`🟢 server running http://localhost:${PORT}`)
})


export default koaApp
