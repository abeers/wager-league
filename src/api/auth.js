import axios from 'axios'

const baseUrl = 'http://localhost:4000'

export const signUp = (data) => {
  console.log('data: ', data)
  return axios({
    url: `${baseUrl}/sign-up`,
    method: 'POST',
    data: { credentials: data },
  })
}

export const signIn = (data) => {
  return axios({
    url: `${baseUrl}/sign-in`,
    method: 'POST',
    data: { credentials: data },
  })
}

export const changePassword = (data, token) => {
  return axios({
    url: `${baseUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { passwords: data },
  })
}

export const signOut = (token) => {
  return axios({
    url: `${baseUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
