import { useEffect, useState } from 'react'
import api from '../api'

export default function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api
      .getAllEvents()
      .then((response) => response.json())
      .then(({ events }) => setEvents(events))
      .catch(console.error)
  }, [])

  return (
    <div className='landing-page'>
      <div>
        <h1>Events</h1>
        <p>View your events</p>
      </div>
      <ul>
        {events?.map((event) => (
          <li>{event}</li>
        ))}
      </ul>
    </div>
  )
}
