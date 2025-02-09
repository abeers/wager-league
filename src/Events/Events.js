import { useEffect, useState } from 'react'
import { deleteEvent, getAllEvents } from '../api/data'
import CreateEventForm from './CreateEventForm'
import { Card } from 'react-bootstrap'
import TrashButton from '../components/layout/TrashButton'
import LinkTitle from '../components/layout/LinkTitle'

const baseUrl = '/wager-league'

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

  return (
    <div className='landing-page'>
      <div>
        <h1>Public Events</h1>
      </div>
      <div className='event-container'>
        {events?.map(
          ({ _id, name, description, owner, submissionDeadline, isPublic }) =>
            isPublic && (
              <Card className='event-card' key={_id}>
                <Card.Header>
                  <div className='spacer'></div>
                  {owner === user._id && (
                    <TrashButton onClick={() => handleDeleteEvent(_id)} />
                  )}
                  <LinkTitle title={name} link={`${baseUrl}/events/${_id}`} />
                  <div className='spacer'></div>
                </Card.Header>
                <Card.Body>{description}</Card.Body>
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
