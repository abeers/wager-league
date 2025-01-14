import { Form } from 'react-bootstrap'

export default function OpenAnswerProp({ value, handleChange }) {
  return (
    <div>
      <div className='propContainer'>
        <Form.Group controlId='optionText'>
          <Form.Control
            required
            type='text'
            name='optionText'
            value={value}
            placeholder='Enter answer'
            onChange={handleChange}
          />
        </Form.Group>
      </div>
    </div>
  )
}
