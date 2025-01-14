import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { createProp } from '../api/data'

const CreatePropForm = ({ token, eventId, refreshEvent }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    propType: '',
    value: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createProp(formData, eventId, token)
      .then(refreshEvent)
      .then(setFormData({ prompt: '', propType: '' }))
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const { prompt, propType, value } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='prompt'>
        <Form.Label>Prop Prompt</Form.Label>
        <Form.Control
          required
          type='text'
          name='prompt'
          value={prompt}
          placeholder='Enter prompt'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='propType'>
        <Form.Label>Prop Type</Form.Label>
        <Form.Select
          onChange={handleChange}
          value={propType}
          name='propType'
          aria-label='Default select example'>
          <option>Choose a prop type</option>
          <option value='overUnder'>Over/Under</option>
          <option value='boolean'>Yes or No</option>
          <option value='multipleChoice'>Multiple Choice</option>
          <option value='openAnswer'>Open Answer</option>
        </Form.Select>
      </Form.Group>
      {propType === 'overUnder' && (
        <Form.Group controlId='value'>
          <Form.Label>Over/Under Line</Form.Label>
          <Form.Control
            required
            type='text'
            name='value'
            value={value}
            placeholder='Enter value'
            onChange={handleChange}
          />
        </Form.Group>
      )}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default CreatePropForm
