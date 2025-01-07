import axios from 'axios'

const baseUrl = 'http://localhost:4000'

export const getAllLeagues = () => fetch(`${baseUrl}/leagues`)

export const createLeague = (data, token) => {
  return axios({
    url: `${baseUrl}/leagues`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { league: data },
  })
}

export const getAllEvents = () => fetch(`${baseUrl}/events`)
// const getAllResults = () => fetch(`${baseUrl}/results`)
