import { useCallback, useEffect, useState } from 'react'
import { getLeague } from '../api/data'
import { useParams } from 'react-router'

export default function League({ user }) {
  const [league, setLeague] = useState({})

  let { leagueId } = useParams()

  const refreshLeague = useCallback(() =>
    getLeague(leagueId, user.token)
      .then((response) => response.json())
      .then(({ league }) => setLeague(league[0]))
      .catch(console.error), [leagueId, user])

  useEffect(() => {
    refreshLeague()
  }, [refreshLeague])

  console.log('league: ', league)

  const { name, members, events, owner } = league

  return (
    <div className='landing-page'>
      <h1>{name}</h1>
      <div>Commissioner: {owner?.username}</div>
      <div>
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
      </div>
    </div>
  )
}
