import axios from 'axios'

const baseUrl = 'https://wager-league-api.onrender.com'

export const signUp = (data) => {
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
