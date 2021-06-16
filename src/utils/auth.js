import { API_URL } from "../config"


export const login = ({ email, password }) => {
  // Assert email or password is not empty
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error('Email or password was not provided')
  }
  const formData = new FormData()
  // OAuth2 expects form data, not JSON data
  formData.append('username', email)
  formData.append('password', password)

  const request = new Request(
    `${API_URL}/api/v1/login/access-token`,
    {
      method: 'POST',
      body: formData,
    }
  )

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

  return data
}
