import { useCallback, useEffect, useState } from 'react'
import {
  // addEventToLeague,
  // getAddableLeagues,
  getEvent,
  getEventStandings,
  getUserEvent,
  updateEvent,
} from '../api/data'
import { useParams } from 'react-router'
import DatePicker from 'react-datepicker'
import CreatePropForm from '../Props/CreatePropForm'
import Prop from '../Props/Prop'
import { Dropdown, Form, Nav, Table } from 'react-bootstrap'

export default function Event({ user }) {
  const [event, setEvent] = useState({})
  const { _id, name, submissionDeadline, props, owner, eventScore } = event
  const [eventKey, setEventKey] = useState('props')
  const [standings, setStandings] = useState([])
  const [selectedUser, setSelectedUser] = useState(user._id)
  const [selectedUserProps, setSelectedUserProps] = useState([])
  // const [addableLeagues, setAddableLeagues] = useState([])

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

  // const handleAddEventToLeague = (leagueId) => {
  //   addEventToLeague(_id, leagueId, user.token)
  // }

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

  // const fetchAddableLeagues = useCallback(
  //   () =>
  //     user.token &&
  //     getAddableLeagues(user.token)
  //       .then((response) => response.data)
  //       .then(({ addableLeagues }) => setAddableLeagues(addableLeagues))
  //       .catch(console.error),
  //   [user]
  // )

  const fetchUserProps = useCallback(
    (userId) =>
      user.token &&
      getUserEvent(eventId, userId, user.token)
        .then((response) => response.data)
        .then(({ event }) => {
          setSelectedUserProps([...event[0]?.props])
        })
        .catch(console.error),
    [user, eventId]
  )

  const handleChangeSelectedUser = (event) =>
    setSelectedUser(event.target.value)

  useEffect(() => {
    refreshEvent()
    // fetchAddableLeagues()
  }, [user, refreshEvent])

  useEffect(() => {
    eventKey === 'props' && refreshEvent()
    eventKey === 'standings' && refreshEventStandings()
    eventKey === 'otherUsersAnswers' && refreshEventStandings()
  }, [eventKey, refreshEvent, refreshEventStandings])

  useEffect(() => {
    selectedUser !== '' && fetchUserProps(selectedUser)
  }, [standings, selectedUser, fetchUserProps])

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
      {/* <Dropdown>
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
      </Dropdown> */}
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
        {pastDeadline && (
          <Nav.Item>
            <Nav.Link eventKey='otherUsersAnswers'>
              Other Users' Answers
            </Nav.Link>
          </Nav.Item>
        )}
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
      {pastDeadline && eventKey === 'otherUsersAnswers' && (
        <>
          <Form.Select value={selectedUser} onChange={handleChangeSelectedUser}>
            {standings?.map(({ _id }) => (
              <option value={_id._id}>{_id.username}</option>
            ))}
          </Form.Select>
          <div>
            {pastDeadline && (
              <p>
                Score:{' '}
                {
                  standings?.find(
                    ({ _id, eventScore }) => _id._id === selectedUser
                  )?.eventScore
                }
              </p>
            )}
          </div>
          {[...selectedUserProps]?.map((prop) => (
            <Prop
              key={prop._id}
              prop={prop}
              pastDeadline={pastDeadline}
              eventId={_id}
              eventOwner={{ _id: 'abc123' }}
              refreshEvent={refreshEvent}
              user={{ _id: selectedUser }}
            />
          ))}
        </>
      )}
    </div>
  )
}
