import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'

interface DecodedJWT {
  header: string
  payload: {
    name: string
  }
  signature: string
}

export function decodeJWT (token: string): DecodedJWT {
  if (!token) {
    throw Error('missing error')
  }

  const [encodedHeader, encodedPayload, signature] = token.split('.')
  const header = JSON.parse(window.atob(encodedHeader))
  const payload = JSON.parse(window.atob(encodedPayload))
  return {
    header,
    payload,
    signature,
  }
}


export function welcomeUser (token: string) {
  const { payload } = decodeJWT(token)

  const msg = `Welcome, ${payload?.name}!`
  useNotification().toast.success(msg)
  console.info(msg)

  useModal().close()
  useRouter().push('/feedbacks')
  return
}


export function setClientAuthToken (token: string) {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token)
  return
}

export function cleanClientAuthToken () {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
  return
}

export function storeUser (token: string) {
  useUser().setJWT(token)
  useUser().setUser(token)
  return
}

export async function authorizeUser (token: string) {
  setClientAuthToken(token)
  welcomeUser(token)
  storeUser(token)
  return
}

export function isJWT (token: string) {
  if (typeof token !== 'string') {
    return false
  }
  const parts = token.split('.')
  if (parts.length !== 3) {
    return false
  }
  const [encodedHeader, encodedPayload, signature] = parts
  try {
    JSON.parse(window.atob(encodedHeader))
    JSON.parse(window.atob(encodedPayload))
  } catch (e) {
    return false
  }
  return true
}
