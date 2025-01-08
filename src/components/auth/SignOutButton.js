import { Button } from 'react-bootstrap'

import { signOut } from '../../api/auth'

const SignOutButton = ({ token, setUser }) => {
  const handleClick = () => {
    signOut(token).then(() => {
      setUser({})
      localStorage.clear()
    })
  }

  return (
    <Button variant='primary' onClick={handleClick}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
