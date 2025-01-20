import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { createLeague } from '../api/data'

const CreateLeagueForm = ({ token, refreshLeagues }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createLeague(formData, token)
      .then(refreshLeagues)
      .then(setFormData({ name: '', description: '', isPublic: true }))
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

  const { name, description, isPublic } = formData

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
      <Form.Group controlId='description'>
        <Form.Label>League Description</Form.Label>
        <Form.Control
          required
          type='text'
          name='description'
          value={description}
          placeholder='Enter league description'
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
