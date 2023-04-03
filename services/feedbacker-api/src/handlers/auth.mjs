import jwt from 'jsonwebtoken'

const {
  JWT_API_SECRET,
} = process.env


const oneHour = 60 * 60

const jwtSignOptions = {
  expiresIn: oneHour * 24
}

function CreateAuthHandler (dbClient) {

  async function login (ctx) {
    const { email, password } = ctx.request.body

    const user = await dbClient.readOneByEmail('users', email)

    const canUserLogin = user?.email === email && user?.password === password
    if (!canUserLogin) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized' }
      return
    }

    const userNotFound = !user
    if (userNotFound) {
      ctx.status = 404
      ctx.body = { error: 'Not found' }
      return
    }

    const payload = {
      id: user.id,
      email: user.email, /* REVIEW SECURITY ISSUE: Can exposing user email via JWT be an attack on your privacy? */
      name: user.name
    }

    const userToken = jwt.sign(
      payload,
      JWT_API_SECRET,
      jwtSignOptions
    )

    ctx.status = 200
    ctx.body = { userToken }
  }

  return { login }
}

export {
  CreateAuthHandler
}
