import { useEffect, useState } from 'react'
import { deleteLeague, getAllLeagues, joinLeague } from '../api/data'
import CreateLeagueForm from './CreateLeagueForm'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

export default function Leagues({ user }) {
  const [leagues, setLeagues] = useState([])

  const refreshLeagues = () =>
    getAllLeagues()
      .then((response) => response.json())
      .then(({ leagues }) => setLeagues(leagues))
      .catch(console.error)

  useEffect(() => {
    refreshLeagues()
  }, [])

  const handleJoinLeague = (id) => {
    joinLeague(id, user.token)
  }

  const handleDeleteLeague = (id) => {
    deleteLeague(id, user.token).then(refreshLeagues)
  }

  return (
    <div className='landing-page'>
      <div>
        <h1>Leagues</h1>
        <p>View your leagues</p>
      </div>
      {leagues?.map(
        ({ _id, name, isPublic }) =>
          isPublic && (
            <>
              <Link to={`/leagues/${_id}`}>{name}</Link>
              <Button onClick={() => handleJoinLeague(_id)}>Join</Button>
              <Button onClick={() => handleDeleteLeague(_id)}>Delete</Button>
            </>
          )
      )}
      {user.token && (
        <CreateLeagueForm token={user.token} refreshLeagues={refreshLeagues} />
      )}
    </div>
  )
}
