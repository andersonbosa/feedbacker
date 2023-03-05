import jwt from 'jsonwebtoken'

const {
  JWT_API_SECRET,
} = process.env

const jwtOtions = {
  expiresIn: 60 * 60
}

function CreateAuthHandler (dbClient) {

  async function login (ctx) {
    const { email, password } = ctx.request.body

    const user = await dbClient.readOneByEmail('users', email)

    const canUserLogin = () => (
      user.email === email && user.password === password
    )

    if (!canUserLogin()) {
      ctx.status = 401
      ctx.body = { error: 'Unauthorized' }
      return
    }


    if (!user) {
      ctx.status = 404
      ctx.body = { error: 'Not found' }
      return
    }


    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    }


    const userToken = jwt.sign(
      payload,
      JWT_API_SECRET,
      jwtOtions
    )

    ctx.status = 200
    ctx.body = { userToken }
  }

  return { login }
}

export {
  CreateAuthHandler
}
