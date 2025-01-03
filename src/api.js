const baseUrl = 'http://localhost:4000'

const getAllLeagues = () => fetch(`${baseUrl}/leagues`)
const getAllEvents = () => fetch(`${baseUrl}/events`)
const getAllResults = () => fetch(`${baseUrl}/results`)

const api = {
  getAllLeagues,
  getAllEvents,
  getAllResults,
}

export default api
