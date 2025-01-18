import { useEffect, useState } from 'react'
import { getEvent, getEventStandings, updateEvent } from '../api/data'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import CreatePropForm from '../Props/CreatePropForm'
import Prop from '../Props/Prop'
import { Nav, Table } from 'react-bootstrap'

export default function Event({ user }) {
  const [event, setEvent] = useState({})
  const [eventKey, setEventKey] = useState('props')
  const [standings, setStandings] = useState([])
  const { _id, name, submissionDeadline, props, owner, eventScore } = event

  let { eventId } = useParams()

  const handleNavSelect = (eventKey) => {
    setEventKey(eventKey)
  }

  const handleDeadlineChange = (date) => {
    const updatedData = {
      ...event,
      submissionDeadline: date,
    }

    setEvent(updatedData)
    updateEvent(updatedData, user.token)
  }

  const refreshEventStandings = () =>
    getEventStandings(eventId)
      .then((response) => response.data)
      .then(({ standings }) => setStandings(standings))

  const refreshEvent = () =>
    user.token &&
    getEvent(eventId, user.token)
      .then((response) => response.data)
      .then(({ event }) => setEvent(event[0]))
      .catch(console.error)

  useEffect(() => {
    refreshEvent()
  }, [user])

  useEffect(() => {
    eventKey === 'props' && refreshEvent()
    eventKey === 'standings' && refreshEventStandings()
  }, [eventKey])

  console.log('event: ', event)
  console.log('standings: ', standings)

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
      <Nav fill variant='tabs' activeKey={eventKey} onSelect={handleNavSelect}>
        <Nav.Item>
          <Nav.Link eventKey='props'>Props</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='standings'>Standings</Nav.Link>
        </Nav.Item>
      </Nav>
      {eventKey === 'props' && (
        <>
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
        </>
      )}
      {eventKey === 'standings' && (
        <>
          <h3>Standings</h3>
          <Table striped>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {standings?.map(({ _id, eventScore }, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{_id?.username}</td>
                  <td>{eventScore}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}
