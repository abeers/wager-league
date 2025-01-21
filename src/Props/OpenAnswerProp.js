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
  return (
    <div>
      <div className='propContainer'>
        <Form.Group controlId='optionText'>
          <Form.Control
            className={`propOption ${
              openAnswer !== '' &&
              (pastDeadline
                ? openAnswer === openResult
                  ? 'form-control-correct'
                  : 'form-control-incorrect'
                : 'form-control-complete')
            }`}
            required
            readOnly={pastDeadline}
            type='text'
            name='optionText'
            value={openAnswer}
            placeholder='Enter answer'
            onChange={handleOpenAnswerChange}
            onBlur={handleOpenAnswerBlur}
          />
        </Form.Group>
        {pastDeadline && (
          <Form.Group controlId='optionResult'>
            <Form.Control
              className='propOption form-control-correct'
              readOnly={!isOwner}
              type='text'
              name='optionResult'
              value={openResult}
              placeholder='Enter result'
              onChange={handleOpenResultChange}
              onBlur={handleDeclareOpenResult}
            />
          </Form.Group>
        )}
      </div>
    </div>
  )
}
