import { useCallback, useEffect, useState } from 'react'
import { changeLeagueRole, getLeague } from '../api/data'
import { useParams } from 'react-router'
import { Form, Table } from 'react-bootstrap'

export default function League({ user }) {
  const [league, setLeague] = useState({})

  let { leagueId } = useParams()

  const refreshLeague = useCallback(
    () =>
      getLeague(leagueId, user.token)
        .then((response) => response.json())
        .then(({ league }) => setLeague(league[0]))
        .catch(console.error),
    [leagueId, user]
  )

  const handleChangeRole = (role, userId) => {
    changeLeagueRole(leagueId, userId, role, user.token).then(refreshLeague)
  }

  useEffect(() => {
    refreshLeague()
  }, [refreshLeague])

  console.log('league: ', league)

  const { name, members, events } = league
  const isCommissioner =
    members?.find(({ _id }) => _id === user._id).role === 'commissioner'

  return (
    <div className='landing-page'>
      <h1 className='title-text'>{name}</h1>
      <div>
        <>
          <h3>Members</h3>
          <Table striped>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {members?.map(({ _id, username, email, role }) => (
                <tr
                  key={_id}
                  className={
                    user._id === _id ? 'highlight-table-row' : undefined
                  }>
                  <td>{username}</td>
                  <td>{email}</td>
                  {isCommissioner ? (
                    <td>
                      <Form.Select
                        value={role}
                        onChange={(event) =>
                          handleChangeRole(event.target.value, _id)
                        }
                        aria-label='Default select example'>
                        <option value='commissioner'>Commissioner</option>
                        <option value='contributor'>Contributor</option>
                        <option value='member'>Member</option>
                      </Form.Select>
                    </td>
                  ) : (
                    <td className='text-capitalize'>{role}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      </div>
      <div>
        Events:
        {events?.map(({ name }) => (
          <p>{name}</p>
        ))}
      </div>
    </div>
  )
}
