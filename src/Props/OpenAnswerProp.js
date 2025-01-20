import { Form } from 'react-bootstrap'

export default function OpenAnswerProp({
  openAnswer,
  openResult,
  isOwner,
  pastDeadline,
  handleOpenAnswerChange,
  handleOpenAnswerBlur,
  handleOpenResultChange,
  handleDeclareOpenResult,
}) {
  console.log('openAnswer: ', openAnswer)
  console.log('openResult: ', openResult)
  return (
    <div>
      <div className='propContainer'>
        <Form.Group controlId='optionText'>
          <Form.Control
            required
            readOnly={pastDeadline}
            type='text'
            name='optionText'
            value={openAnswer}
            placeholder='Enter answer'
            onChange={handleOpenAnswerChange}
            onBlur={handleOpenAnswerBlur}
          />
          <Form.Control
            readOnly={!isOwner}
            type='text'
            name='optionResult'
            value={openResult}
            placeholder='Enter result'
            onChange={handleOpenResultChange}
            onBlur={handleDeclareOpenResult}
          />
        </Form.Group>
      </div>
    </div>
  )
}
