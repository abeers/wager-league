import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { changePassword } from '../../api/auth'

const ChangePasswordForm = ({ token }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    changePassword(formData, token).then(console.log)
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const { oldPassword, newPassword } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='oldPassword'>
        <Form.Label>Old Password</Form.Label>
        <Form.Control
          required
          type='password'
          name='oldPassword'
          value={oldPassword}
          placeholder='Enter old password'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='newPassword'>
        <Form.Label>New Password</Form.Label>
        <Form.Control
          required
          name='newPassword'
          value={newPassword}
          type='password'
          placeholder='Enter new password'
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default ChangePasswordForm
