import { useEffect, useState } from 'react'
import { getAllLeagues, joinLeague } from '../api/data'
import CreateLeagueForm from './CreateLeagueForm'
import { Button } from 'react-bootstrap'

export default function Leagues({ user }) {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    getAllLeagues()
      .then((response) => response.json())
      .then(({ leagues }) => setLeagues(leagues))
      .catch(console.error)
  }, [])
  console.log('leagues: ', leagues)

  const handleJoin = (id) => {
    joinLeague(id, user.token)
  }

  return (
    <div className='landing-page'>
      <div>
        <h1>Leagues</h1>
        <p>View your leagues</p>
      </div>
      <ul>
        {leagues?.map(
          ({ _id, name, isPublic }) =>
            isPublic && (
              <>
                <li>{name}</li>
                <Button onClick={() => handleJoin(_id)}>Join</Button>
              </>
            )
        )}
      </ul>
      {user.token && <CreateLeagueForm token={user.token} />}
    </div>
  )
}
