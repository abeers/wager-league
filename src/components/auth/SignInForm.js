import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Form, Button } from 'react-bootstrap'

import { signIn } from '../../api/auth'

const SignInForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    signIn(formData)
      .then((response) => {
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      })
      .then(() => navigate('/'))
      .catch(console.error)
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const { identifier, password } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='username'>
        <Form.Label>Username or Email Address</Form.Label>
        <Form.Control
          required
          type='text'
          name='identifier'
          value={identifier}
          placeholder='Enter username or email address'
          onChange={handleChange}
        />
      </Form.Group>
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
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default SignInForm
