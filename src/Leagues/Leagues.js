import { useEffect, useState } from 'react'
import {
  deleteLeague,
  getAllLeagues,
  joinLeague,
  leaveLeague,
} from '../api/data'
import CreateLeagueForm from './CreateLeagueForm'
import { Button, Card } from 'react-bootstrap'
import TrashButton from '../components/layout/TrashButton'
import LinkTitle from '../components/layout/LinkTitle'
import { useNavigate } from 'react-router'

export default function Leagues({ user }) {
  const [leagues, setLeagues] = useState([])

  const navigate = useNavigate()

  const refreshLeagues = () =>
    getAllLeagues()
      .then((response) => response.json())
      .then(({ leagues }) => setLeagues(leagues))
      .catch(console.error)

  useEffect(() => {
    refreshLeagues()
  }, [])

  const handleJoinLeague = (id) => {
    joinLeague(id, user.token).then(() => navigate(`/leagues/${id}`))
  }

  const handleLeaveLeague = (id) => {
    leaveLeague(id, user)
  }

  const handleDeleteLeague = (id) => {
    deleteLeague(id, user.token).then(refreshLeagues)
  }

  return (
    <div className='league-page'>
      <div>
        <h1>Leagues</h1>
      </div>
      <div className='league-container'>
        {leagues?.map(
          ({ _id, name, description, owner, members, isPublic }) =>
            isPublic && (
              <Card className='league-card' key={_id}>
                <Card.Header>
                  <div className='spacer'></div>
                  {owner === user._id && (
                    <TrashButton onClick={() => handleDeleteLeague(_id)} />
                  )}
                  <LinkTitle title={name} link={`/leagues/${_id}`} />
                  <div className='spacer'></div>
                </Card.Header>
                <Card.Body>{description}</Card.Body>
                <Card.Footer>
                  {members.some((member) => member._id === user._id) ? (
                    <Button onClick={() => handleLeaveLeague(_id)}>
                      Leave
                    </Button>
                  ) : (
                    <Button onClick={() => handleJoinLeague(_id)}>Join</Button>
                  )}
                </Card.Footer>
              </Card>
            )
        )}
      </div>
      {user.token && (
        <CreateLeagueForm token={user.token} refreshLeagues={refreshLeagues} />
      )}
    </div>
  )
}
