import { useEffect, useState } from 'react'
import { getAllLeagues } from '../api/data'
import CreateLeagueForm from './CreateLeagueForm'

export default function Leagues({ user }) {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    getAllLeagues()
      .then((response) => response.json())
      .then(({ leagues }) => setLeagues(leagues))
      .catch(console.error)
  }, [])

  return (
    <div className='landing-page'>
      <div>
        <h1>Leagues</h1>
        <p>View your leagues</p>
      </div>
      <ul>
        {leagues?.map(
          ({ name }) => (
            <li>{name}</li>
          )
          // ({ isPublic }) => isPublic
        )}
      </ul>
      <CreateLeagueForm token={user.token} />
    </div>
  )
}
