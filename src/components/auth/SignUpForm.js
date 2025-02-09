import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { signIn, signUp } from '../../api/auth'

const SignUpForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    // email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    signUp(formData)
      .then(() =>
        signIn({ identifier: username, password })
          .then((response) => {
            setUser(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
          })
          .then(() => navigate('/wager-league'))
          .catch(console.error)
      )
      .catch(console.error)
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const { username, password, passwordConfirmation } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='username'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type='text'
          name='username'
          value={username}
          placeholder='Enter name'
          onChange={handleChange}
        />
      </Form.Group>
      {/* <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          required
          type='email'
          name='email'
          value={email}
          placeholder='Enter email'
          onChange={handleChange}
        />
      </Form.Group> */}
      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name='password'
          value={password}
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='passwordConfirmation'>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          required
          name='passwordConfirmation'
          value={passwordConfirmation}
          type='password'
          placeholder='Confirm password'
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default SignUpForm
