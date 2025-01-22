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

export const leaveLeague = (leagueId, user) => {
  return axios({
    url: `${baseUrl}/leagues/${leagueId}/users/${user._id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

export const changeLeagueRole = (leagueId, userId, role, token) => {
  return axios({
    url: `${baseUrl}/leagues/${leagueId}/users/${userId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { role },
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

export const getEvent = (id, token) => {
  return axios({
    url: `${baseUrl}/events/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getEventStandings = (id) => {
  return axios({
    url: `${baseUrl}/events/${id}/standings`,
    method: 'GET',
  })
}

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

export const updateEvent = (data, token) => {
  return axios({
    url: `${baseUrl}/events/${data._id}`,
    method: 'PATCH',
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

export const deleteProp = (propId, token) => {
  return axios({
    url: `${baseUrl}/props/${propId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createOption = (data, propId, token) => {
  return axios({
    url: `${baseUrl}/props/${propId}/options`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { option: data },
  })
}

export const deleteOption = (propId, optionId, token) => {
  return axios({
    url: `${baseUrl}/props/${propId}/options/${optionId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateAnswer = (eventId, propId, optionId, token) => {
  return axios({
    url: `${baseUrl}/events/${eventId}/props/${propId}/answers`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { option: optionId },
  })
}

export const updateOpenAnswer = (eventId, propId, optionText, token) => {
  return axios({
    url: `${baseUrl}/events/${eventId}/props/${propId}/openAnswers`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { option: optionText },
  })
}

export const updateResult = (eventId, propId, optionId, token) => {
  return axios({
    url: `${baseUrl}/events/${eventId}/props/${propId}/results`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { option: optionId },
  })
}

export const updateOpenResult = (eventId, propId, optionText, token) => {
  return axios({
    url: `${baseUrl}/events/${eventId}/props/${propId}/openResults`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { option: optionText },
  })
}

// const getAllResults = () => fetch(`${baseUrl}/results`)
