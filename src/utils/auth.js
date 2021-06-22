import decodeJwt from 'jwt-decode'
import { API_URL } from '../config'

export const signup = async ({
  first_name,
  last_name,
  email,
  password,
  ROLE,
}) => {
  // Assert email or password is not empty
  console.log('in signup')
  if (
    !(email.length > 0) ||
    !(password.length > 0) ||
    !(first_name.length > 0) ||
    !(last_name.length > 0)
  ) {
    throw new Error('Email or password was not provided')
  }
  const formData = {
    email,
    first_name,
    last_name,
    password,
    ROLE,
  }
  const request = new Request(`${API_URL}users/open`, {
    method: 'POST',
    body: JSON.stringify(formData),
  })

  const response = await fetch(request) //.catch(err => console.log(err.response));

  if (response.status === 500) {
    throw new Error('Internal server error')
  }

  const data = await response.json()
  console.log(data)
  if (response.status >= 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail
    }
    throw data
  }

  if ('access_token' in data) {
    const decodedToken = decodeJwt(data['access_token'])
    localStorage.setItem('token', data['access_token'])
    localStorage.setItem('permissions', decodedToken.permissions)
  }
  console.log(data)
  return data
}

export const login = async ({ email, password }) => {
  // Assert email or password is not empty
  console.log('in login')
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error('Email or password was not provided')
  }
  const formData = new FormData()
  // OAuth2 expects form data, not JSON data
  formData.append('username', email)
  formData.append('password', password)

  const request = new Request(`${API_URL}login/access-token`, {
    method: 'POST',
    body: formData,
  })

  const response = await fetch(request).catch((err) =>
    console.log(err.response)
  )
  console.log(response)
  if (response?.status === 500) {
    throw new Error('Internal server error')
  }

  const data = await response.json()
  if (response.status >= 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail
    }
    throw data
  }

  if ('access_token' in data) {
    const decodedToken = decodeJwt(data['access_token'])
    console.log(decodedToken)
    localStorage.setItem('token', data['access_token'])
    localStorage.setItem('auth', true)
    localStorage.setItem('exp', new Date().getTime() + decodedToken.exp)
  }
  console.log(data)

  return data
}

export const isAuthenticated = () => {
  const auth = localStorage.getItem('auth')
  const time = new Date().getTime()
  const TokenExp = localStorage.getItem('exp')

  if (TokenExp <= time) {
    localStorage.removeItem('auth')
    return false
  }
  console.log('auth', auth)
  return auth
}

export const logout = () => {
  localStorage.removeItem('auth')
  localStorage.removeItem('permissions')
  localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  console.log(token)
  const request = new Request(API_URL + 'users/me', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  const response = await fetch(request)
  const data = await response.json()
  console.log(data)
  const { ROLE } = data
  console.log(`role`, ROLE)
  localStorage.setItem('role', ROLE?.toUpperCase())
  localStorage.setItem('auth', true)

  return data
}

export const verifyRole = (verifyRole) => {
  const auth = localStorage.getItem('auth')
  const role = localStorage.getItem('role')
  console.log(role, verifyRole, auth)
  return auth ? (role === verifyRole ? true : false) : false
}
