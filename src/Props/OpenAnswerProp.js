import { Form } from 'react-bootstrap'

export default function OpenAnswerProp({
  openAnswer,
  handleOpenAnswerChange,
  handleOpenAnswerBlur,
}) {
  console.log('openAnswer: ', openAnswer)
  return (
    <div>
      <div className='propContainer'>
        <Form.Group controlId='optionText'>
          <Form.Control
            required
            type='text'
            name='optionText'
            value={openAnswer}
            placeholder='Enter answer'
            onChange={handleOpenAnswerChange}
            onBlur={handleOpenAnswerBlur}
          />
        </Form.Group>
      </div>
    </div>
  )
}
