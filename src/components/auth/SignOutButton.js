import { Button } from 'react-bootstrap'

import { signOut } from '../../api/auth'

const SignOutButton = ({ token, setUser }) => {
  const handleClick = () => {
    signOut(token).then(() => {
      setUser((prevUser) => {
        return { ...prevUser, token: null }
      })
    })
  }

  return (
    <Button variant='primary' onClick={handleClick}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
