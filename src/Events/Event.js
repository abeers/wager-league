import { useCallback, useEffect, useState } from 'react'
import {
  addEventToLeague,
  getAddableLeagues,
  getEvent,
  getEventStandings,
  updateEvent,
} from '../api/data'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import CreatePropForm from '../Props/CreatePropForm'
import Prop from '../Props/Prop'
import { Dropdown, Nav, Table } from 'react-bootstrap'

export default function Event({ user }) {
  const [event, setEvent] = useState({})
  const [eventKey, setEventKey] = useState('props')
  const [standings, setStandings] = useState([])
  const [addableLeagues, setAddableLeagues] = useState([])
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

  const handleAddEventToLeague = (leagueId) => {
    addEventToLeague(_id, leagueId, user.token)
  }

  const refreshEventStandings = useCallback(
    () =>
      getEventStandings(eventId)
        .then((response) => response.data)
        .then(({ standings }) => setStandings(standings)),
    [eventId]
  )

  const refreshEvent = useCallback(
    () =>
      user.token &&
      getEvent(eventId, user.token)
        .then((response) => response.data)
        .then(({ event }) => setEvent(event[0]))
        .catch(console.error),
    [eventId, user]
  )

  const fetchAddableLeagues = useCallback(
    () =>
      user.token &&
      getAddableLeagues(user.token)
        .then((response) => response.data)
        .then(({ addableLeagues }) => setAddableLeagues(addableLeagues))
        .catch(console.error),
    [user]
  )

  useEffect(() => {
    refreshEvent()
    fetchAddableLeagues()
  }, [user, refreshEvent, fetchAddableLeagues])

  useEffect(() => {
    eventKey === 'props' && refreshEvent()
    eventKey === 'standings' && refreshEventStandings()
  }, [eventKey, refreshEvent, refreshEventStandings])

  console.log('event: ', event)
  console.log('standings: ', standings)
  console.log('user: ', user)
  console.log('addableLeagues: ', addableLeagues)
  const pastDeadline = Date.parse(submissionDeadline) < Date.now()
  const isOwner = user?._id === owner?._id
  const submissionDate = new Date(submissionDeadline)

  return (
    <div className='landing-page'>
      <h1 className='title-text'>{name}</h1>
      <div>Creator: {owner?.username}</div>
      <div>
        Submission Deadline:
        {isOwner ? (
          <DatePicker
            readOnly={owner?._id !== user?._id}
            selected={submissionDeadline ? submissionDate : null}
            onChange={handleDeadlineChange}
            showTimeSelect
            dateFormat='Pp'
          />
        ) : (
          <span>
            {submissionDate.toLocaleString([], {
              month: '2-digit',
              day: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
      <Dropdown>
        <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
          Add Event to League
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {addableLeagues.map(({ leagueId, leagueName }) => (
            <Dropdown.Item onClick={() => handleAddEventToLeague(leagueId)}>
              {leagueName}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Nav
        fill
        className='nav-justified'
        variant='tabs'
        activeKey={eventKey}
        onSelect={handleNavSelect}>
        <Nav.Item>
          <Nav.Link eventKey='props'>Props</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='standings'>Standings</Nav.Link>
        </Nav.Item>
      </Nav>
      {eventKey === 'props' && (
        <>
          <div>{pastDeadline && <p>Score: {eventScore}</p>}</div>
          {props?.map((prop) => (
            <Prop
              key={prop._id}
              prop={prop}
              pastDeadline={pastDeadline}
              eventId={_id}
              eventOwner={owner}
              refreshEvent={refreshEvent}
              user={user}
            />
          ))}
          {isOwner && !pastDeadline && (
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
                <tr
                  key={_id?._id}
                  className={
                    user._id === _id?._id ? 'highlight-table-row' : undefined
                  }>
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
