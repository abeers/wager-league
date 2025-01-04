import { Container } from 'react-bootstrap'

import SignUpForm from './SignUpForm.js'
import SignInForm from './SignInForm.js'
import ChangePasswordForm from './ChangePasswordForm.js'
import SignOutButton from './SignOutButton.js'

export default function AuthPage({ user, setUser }) {
  return (
    <Container>
      {!user.token && (
        <>
          <SignUpForm setUser={setUser} />
          <SignInForm setUser={setUser} />
        </>
      )}

      {user.token && (
        <>
          <ChangePasswordForm token={user.token} />
          <SignOutButton token={user.token} setUser={setUser} />
        </>
      )}
    </Container>
  )
}
