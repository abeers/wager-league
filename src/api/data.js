import axios from 'axios'

const baseUrl = 'http://localhost:4000'

export const getAllLeagues = () => fetch(`${baseUrl}/leagues`)

export const getLeague = (id) => fetch(`${baseUrl}/leagues/${id}`)

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

export const joinLeague = (leagueId, token) => {
  return axios({
    url: `${baseUrl}/leagues/${leagueId}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteLeague = (leagueId, token) => {
  return axios({
    url: `${baseUrl}/leagues/${leagueId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAllEvents = () => fetch(`${baseUrl}/events`)

export const getEvent = (id) => fetch(`${baseUrl}/events/${id}`)

export const createEvent = (data, token) => {
  return axios({
    url: `${baseUrl}/events`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { event: data },
  })
}

export const addEventToLeague = (eventId, leagueId, token) => {
  return axios({
    url: `${baseUrl}/leagues/${leagueId}/events/${eventId}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteEvent = (eventId, token) => {
  return axios({
    url: `${baseUrl}/events/${eventId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createProp = (data, eventId, token) => {
  return axios({
    url: `${baseUrl}/props`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { prop: data, eventId },
  })
}

// const getAllResults = () => fetch(`${baseUrl}/results`)
