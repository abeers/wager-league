import { useEffect, useState } from 'react'
import { getEvent, updateEvent } from '../api/data'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import CreatePropForm from '../Props/CreatePropForm'
import Prop from '../Props/Prop'

export default function Event({ user }) {
  const [event, setEvent] = useState({})
  const { _id, name, submissionDeadline, props, owner, eventScore } = event

  let { eventId } = useParams()

  const handleDeadlineChange = (date) => {
    const updatedData = {
      ...event,
      submissionDeadline: date,
    }

    setEvent(updatedData)
    updateEvent(updatedData, user.token)
  }

  const refreshEvent = () =>
    user.token &&
    getEvent(eventId, user.token)
      .then((response) => response.data)
      .then(({ event }) => setEvent(event[0]))
      .catch(console.error)

  useEffect(() => {
    refreshEvent()
  }, [user])

  console.log('event: ', event)

  return (
    <div className='landing-page'>
      <h1>{name}</h1>
      <div>Creator: {owner?.username}</div>
      <div>
        Deadline:
        <DatePicker
          readOnly={owner?._id !== user?._id}
          selected={submissionDeadline ? new Date(submissionDeadline) : null}
          onChange={handleDeadlineChange}
          showTimeSelect
          dateFormat='Pp'
        />
      </div>
      <div>
        <p>Score: {eventScore}</p>
      </div>
      {props?.map((prop) => (
        <Prop
          prop={prop}
          pastDeadline={Date.parse(submissionDeadline) < Date.now()}
          eventId={_id}
          eventOwner={owner}
          refreshEvent={refreshEvent}
          user={user}
        />
      ))}
      {user?._id === owner?._id &&
        Date.parse(submissionDeadline) > Date.now() && (
          <CreatePropForm
            eventId={eventId}
            refreshEvent={refreshEvent}
            token={user.token}
          />
        )}
    </div>
  )
}
