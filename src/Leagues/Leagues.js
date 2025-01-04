import { useEffect, useState } from 'react'
import api from '../api/data'

export default function Leagues() {
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    api
      .getAllLeagues()
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
        {leagues?.map((league) => (
          <li>{league}</li>
        ))}
      </ul>
    </div>
  )
}
