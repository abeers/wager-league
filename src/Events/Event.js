import { useEffect, useState } from 'react'
import { getEvent } from '../api/data'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import CreatePropForm from '../Props/CreatePropForm'
import Prop from '../Props/Prop'

export default function Event({ user }) {
  const [event, setEvent] = useState({})

  let { eventId } = useParams()

  const refreshEvent = () =>
    getEvent(eventId, user.token)
      .then((response) => response.json())
      .then(({ event }) => setEvent(event[0]))
      .catch(console.error)

  useEffect(() => {
    refreshEvent()
  }, [])

  console.log('event: ', event)

  const { name, submissionDeadline, props, owner } = event

  return (
    <div className='landing-page'>
      <h1>{name}</h1>
      <div>Creator: {owner?.username}</div>
      <div>
        Deadline:
        <DatePicker
          readOnly
          showTimeSelect
          dateFormat='Pp'
          selected={submissionDeadline}
        />
      </div>
      {props?.map((prop) => (
        <Prop prop={prop} />
      ))}
      <CreatePropForm
        eventId={eventId}
        refreshEvent={refreshEvent}
        token={user.token}
      />
      {/* <div>
        Members:
        {members?.map(({ username }) => (
          <p>{username}</p>
        ))}
      </div>
      <div>
        Events:
        {events?.map(({ name }) => (
          <p>{name}</p>
        ))}
      </div> */}
    </div>
  )
}
