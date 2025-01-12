import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { createEvent } from '../api/data'

const CreateEventForm = ({ token, refreshEvents }) => {
  const [formData, setFormData] = useState({
    name: '',
    submissionDeadline: new Date(),
    isPublic: true,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    createEvent(formData, token)
      .then(refreshEvents)
      .then(
        setFormData({
          name: '',
          submissionDeadline: Date.now(),
          isPublic: true,
        })
      )
  }

  const handleChange = (event) => {
    const updatedData = {
      ...formData,
      [event.target.name]: event.target.value,
    }

    setFormData(updatedData)
  }

  const handleDateChange = (date) => {
    const updatedData = {
      ...formData,
      submissionDeadline: date,
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

  const { name, submissionDeadline, isPublic } = formData

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='name'>
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          required
          type='text'
          name='name'
          value={name}
          placeholder='Enter event name'
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId='submissionDeadline'>
        <Form.Label>Submission Deadline</Form.Label>
        <DatePicker
          name='submissionDeadline'
          selected={submissionDeadline}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat='Pp'
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

export default CreateEventForm
