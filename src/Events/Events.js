import { useEffect, useState } from 'react'
import { deleteEvent, getAllEvents, joinEvent } from '../api/data'
import CreateEventForm from './CreateEventForm'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

export default function Events({ user }) {
  const [events, setEvents] = useState([])

  const refreshEvents = () =>
    getAllEvents()
      .then((response) => response.json())
      .then(({ events }) => setEvents(events))
      .catch(console.error)

  useEffect(() => {
    refreshEvents()
  }, [])

  // const handleJoinEvent = (id) => {
  //   joinEvent(id, user.token)
  // }

  const handleDeleteEvent = (id) => {
    deleteEvent(id, user.token).then(refreshEvents)
  }

  console.log('events: ', events)

  return (
    <div className='landing-page'>
      <div>
        <h1>Events</h1>
        <p>View your events</p>
      </div>
      {events?.map(
        ({ _id, name, owner, isPublic }) =>
          isPublic && (
            <>
              <Link to={`/events/${_id}`}>{name}</Link>
              {/* <Button onClick={() => handleJoinEvent(_id)}>Join</Button> */}
              {owner === user?._id && (
                <Button onClick={() => handleDeleteEvent(_id)}>Delete</Button>
              )}
            </>
          )
      )}
      {user.token && (
        <CreateEventForm token={user.token} refreshEvents={refreshEvents} />
      )}
    </div>
  )
}
