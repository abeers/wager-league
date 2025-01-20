import { useEffect, useState } from 'react'
import {
  deleteLeague,
  getAllLeagues,
  joinLeague,
  leaveLeague,
} from '../api/data'
import CreateLeagueForm from './CreateLeagueForm'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
          ({ _id, name, owner, members, isPublic }) =>
            isPublic && (
              <Card className='league-card' key={_id}>
                <Card.Header>
                  {owner === user._id && (
                    <div class='trash-button'>
                      <Button
                        variant={'danger'}
                        onClick={() => handleDeleteLeague(_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  )}
                  <Link to={`/leagues/${_id}`}>{name}</Link>
                </Card.Header>
                <Card.Body>Description</Card.Body>
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
