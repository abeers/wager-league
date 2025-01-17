import { Button, Card } from 'react-bootstrap'
import CreateOptionForm from '../Options/CreateOptionForm'

export default function MultipleChoiceProp({
  options,
  selectedOption,
  result,
  propId,
  isOwner,
  pastDeadline,
  handleClickedOption,
  handleDeleteOption,
  handleDeclareResult,
  refreshEvent,
  token,
}) {
  console.log('result: ', result)
  return (
    <>
      <div className='propContainer'>
        {options?.map(({ _id, optionText }) => (
          <Card
            onClick={() => handleClickedOption(_id)}
            className={'propOption'}
            bg={
              _id === selectedOption &&
              (pastDeadline
                ? _id === result
                  ? 'success'
                  : 'danger'
                : 'primary')
            }
            border={pastDeadline && _id === result && 'success'}>
            <Card.Body>
              <p>{optionText}</p>
              {isOwner &&
                (pastDeadline ? (
                  <Button onClick={() => handleDeclareResult(_id)}>
                    Declare Result
                  </Button>
                ) : (
                  <Button onClick={() => handleDeleteOption(_id)}>
                    Delete
                  </Button>
                ))}
            </Card.Body>
          </Card>
        ))}
      </div>
      {isOwner && !pastDeadline && (
        <CreateOptionForm
          propId={propId}
          refreshEvent={refreshEvent}
          token={token}
        />
      )}
    </>
  )
}
