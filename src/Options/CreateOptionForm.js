import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { createOption } from '../api/data'

const CreateOptionForm = ({ token, propId, refreshEvent }) => {
  const [formData, setFormData] = useState({
    optionText: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createOption(formData, propId, token)
      .then(refreshEvent)
      .then(setFormData({ optionText: '' }))
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const { optionText } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='optionText'>
        <Form.Label>Option Prompt</Form.Label>
        <Form.Control
          required
          type='text'
          name='optionText'
          value={optionText}
          placeholder='Enter option'
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default CreateOptionForm
