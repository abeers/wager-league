import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { createLeague } from '../api/data'

const CreateLeagueForm = ({ token }) => {
  const [formData, setFormData] = useState({
    name: '',
    isPublic: true,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createLeague(formData, token).then((response) =>
      console.log('response: ', response)
    )
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const handleCheckboxChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.checked,
    }

    setFormData(updatedData)
  }

  const { name, isPublic } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='name'>
        <Form.Label>League Name</Form.Label>
        <Form.Control
          required
          type='text'
          name='name'
          value={name}
          placeholder='Enter league name'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='isPublic'>
        <Form.Label>Public</Form.Label>
        <Form.Check
          name='isPublic'
          checked={isPublic}
          type='checkbox'
          onChange={handleCheckboxChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default CreateLeagueForm
