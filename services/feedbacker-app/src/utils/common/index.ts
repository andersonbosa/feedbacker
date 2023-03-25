import crypto from 'crypto'

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
    throw Error('missing token')
  }

  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    const header = JSON.parse(window.atob(encodedHeader))
    const payload = JSON.parse(window.atob(encodedPayload))
    return {
      header,
      payload,
      signature,
    }
  } catch (error) {
    return {}
  }
}


export function setClientAuthToken (token: string) {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token)
  return
}

export function cleanBrowserAuthorization () {
  /* TODO requisição para o servidor avisando para invalidar o TOKEN */
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
  useRouter().push('/')
  return
}

export function storeUser (token: string) {
  useUser().setJWT(token)
  useUser().setUser(token)
  return
}

// export async function authorizeUser (token: string) {
//   setClientAuthToken(token)
//   welcomeUser(token)
//   storeUser(token)
//   return
// }

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


export function sha256 (input: string) {
  return crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(input)
  )
    .then(buffer => {
      return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
    })
}

export function getClientAuthToken (token: string) {
  window.localStorage.setItem('token', token)
}

