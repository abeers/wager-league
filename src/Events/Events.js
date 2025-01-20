import { useEffect, useState } from 'react'
import { deleteEvent, getAllEvents } from '../api/data'
import CreateEventForm from './CreateEventForm'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
      <div className='event-container'>
        {events?.map(
          ({ _id, name, owner, submissionDeadline, isPublic }) =>
            isPublic && (
              <Card className='event-card' key={_id}>
                <Card.Header>
                  {owner === user._id && (
                    <div class='trash-button'>
                      <Button
                        variant={'danger'}
                        onClick={() => handleDeleteEvent(_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  )}
                  <Link to={`/events/${_id}`}>{name}</Link>
                </Card.Header>
                <Card.Body>Description</Card.Body>
                <Card.Footer>
                  {new Date(submissionDeadline) > Date.now()
                    ? new Date(submissionDeadline).toLocaleString([], {
                        weekday: 'short',
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Deadline Passed'}
                </Card.Footer>
              </Card>
            )
        )}
      </div>
      {user.token && (
        <CreateEventForm token={user.token} refreshEvents={refreshEvents} />
      )}
    </div>
  )
}
