import { Button, Card } from 'react-bootstrap'
import CreateOptionForm from '../Options/CreateOptionForm'

export default function MultipleChoiceProp({
  options,
  selectedOption,
  propId,
  isOwner,
  handleClickedOption,
  handleDeleteOption,
  refreshEvent,
  token,
}) {
  return (
    <>
      <div className='propContainer'>
        {options?.map(({ _id, optionText }) => (
          <Card
            onClick={() => handleClickedOption(_id)}
            className={'propOption'}
            bg={_id === selectedOption && 'primary'}>
            <Card.Body>
              <p>{optionText}</p>
              {isOwner && (
                <Button onClick={() => handleDeleteOption(_id)}>Delete</Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
      {isOwner && (
        <CreateOptionForm
          propId={propId}
          refreshEvent={refreshEvent}
          token={token}
        />
      )}
    </>
  )
}
