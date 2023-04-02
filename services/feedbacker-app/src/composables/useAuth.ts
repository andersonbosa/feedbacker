import { AuthResponse, LoginPayload, RegisterPayload } from '~/lib/types'
import { cleanBrowserAuthorization } from '~/utils/common'
import services from '~/utils/services'
import { LOCAL_STORAGE_TOKEN_NAME } from '../lib/contants'


async function authorizeToken (jwt: string) {
  await useUser().setUserIdentityByToken(jwt)
  useUser().welcomeUser()
  return undefined
}

async function handleAccountCreateModalErrors (errors = []) {
  const hasErrors = errors?.length > 0
  if (!hasErrors) {
    return
  }

  /* TODO specific errors: 400, 401, 402, 403, >500 ? */
  if (errors.status === 400) {
    useNotification().toast.error('Ocorreu um erro ao criar a conta')
    throw errors
  }
  if (errors.status > 500) {
    useNotification().toast.error('Ocorreu um erro com servidor, a equipe técnica já foi avisada!')
    throw errors
  }

  return
}

async function handleAccountCreateModal (registerPayload: RegisterPayload) {
  try {
    const { data, errors } = await services.auth.register(registerPayload)
    await handleAccountCreateModalErrors(errors) /* ASYNC */

    const couldCreateUser = Boolean(data?.id && data?.name)
    if (!couldCreateUser) {
      const msg = 'Erro ao tentar cadastrar. A equipe ténica já foi encontrada.'
      useNotification().toast.error(msg)
      console.warn(msg)
      // throw new Error(errors)
      return { data: undefined, errors }
    }

    useNotification().toast.success(`Usuário "${data.email}" registrado com sucesso. Verifique seu e-mail.`)

    return { data, errors }

  } catch (error: any) {
    await handleAccountCreateModalErrors(error)
    return { data: undefined, errors: [error] }
  }
}


async function handleLoginErrors (errors: any) {
  const hasErrors = errors?.length > 0
  if (!hasErrors) {
    return
  }

  /* TODO IMPROVE ERROR HANDLING */
  if (errors.status === 401) {
    useNotification().toast.error('E-mail/senha inválidos')
  }
  if (errors.status >= 500 || errors.status) {
    useNotification().toast.error(
      'Ocorreu um erro no servidor e a equipe de suporte já foi notificada!'
    )
  }

  return errors
}

async function performAccountLogin (loginPayload: LoginPayload) {

}


export default function useAuth () {
  console.log('🔐 useAuth')

  return {

    userIsAuth () {
      return Boolean(useUser().store.user?.id)
    },

    async registerHandler (registerPayload: RegisterPayload): AuthResponse {
      console.log(' 🟠 registerHandler', /* registerPayload */)
      try {
        const { data, errors } = await handleAccountCreateModal(registerPayload)
        handleAccountCreateModalErrors(errors)

        await performAccountLogin({
          email: registerPayload.email,
          password: registerPayload.password
        })

        return data

      } catch (error) {
        handleAccountCreateModalErrors(errors)
        return { data: undefined, errors: [errors] }
      }
    },

    async loginHandler (loginPayload: LoginPayload): AuthResponse {
      try {
        console.log(' 🟠 loginHandler', /* loginPayload */)
        const { data, errors } = await services.auth.login(loginPayload)
        handleLoginErrors(errors)

        const hasToken = Boolean(data?.userToken)
        const hasCredentials = Boolean(data?.id && data?.name)

        /* authentication strategies */
        if (hasToken) {
          authorizeToken(data.userToken)
        } else if (hasCredentials) {
          /* TOFIX */
          // await authorizeCredentials(data)
          console.log(' 🟠 hasCredentials', data)
        }

        /* REVIEW FAZ SENTIDO RETORNAR VALOR? FAZ SENTIDO SER COM RETURN-EARLY? */
        return { data: data, errors: [errors] }

      } catch (error: any) {
        /* REVIEW observeErrorOnSentry(error)  */
        return { data: undefined, errors: [error] }
      }
    },

    async logoutHandler () {
      useNotification().toast.info(`Até depois, ${useUser().store.getUserFirstName}!`)
      cleanBrowserAuthorization()
      useUser().store.$reset()
      /* TODO: requisição para invalidação do JWT na API */
      return
    },

    async tryPersistUserByLocalStorage () {
      if (useAuth().getLocalJWT()) {
        return
      }

      if (useAuth().userIsAuth()) {
        return
      }

      const { data } = await services.users.getMe()

      const hasUserData = data?.id && data?.name
      if (!hasUserData) {
        return
      }

      /* REFACTOR seems very ugly this 😢 */
      useUser().store.setUser(data)
      useUser().store.setToken(useAuth().getLocalJWT())
      useUser().welcomeUser()
    },

    getLocalJWT () {
      return window?.localStorage?.getItem(LOCAL_STORAGE_TOKEN_NAME)
    }
  }
}

