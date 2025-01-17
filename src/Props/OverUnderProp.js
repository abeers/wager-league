import { Button, Card } from 'react-bootstrap'

export default function OverUnderProp({
  options,
  selectedOption,
  result,
  value,
  isOwner,
  pastDeadline,
  handleClickedOption,
  handleDeclareResult,
}) {
  return (
    <div>
      <div className='propContainer'>
        <Card
          onClick={() => handleClickedOption(options[0]?._id)}
          className={'propOption'}
          bg={
            options[0]?._id === selectedOption &&
            (pastDeadline
              ? options[0]?._id === result
                ? 'success'
                : 'danger'
              : 'primary')
          }
          border={pastDeadline && options[0]?._id === result && 'success'}>
          <Card.Body>
            <p>{options[0]?.optionText}</p>
            {isOwner && pastDeadline && (
              <Button onClick={() => handleDeclareResult(options[0]?._id)}>
                Declare Result
              </Button>
            )}
          </Card.Body>
        </Card>

        <div className='overUnderValue'>{value}</div>

        <Card
          onClick={() => handleClickedOption(options[1]?._id)}
          className={'propOption'}
          bg={
            options[1]?._id === selectedOption &&
            (pastDeadline
              ? options[1]?._id === result
                ? 'success'
                : 'danger'
              : 'primary')
          }
          border={pastDeadline && options[1]?._id === result && 'success'}>
          <Card.Body>
            <p>{options[1]?.optionText}</p>
            {isOwner && pastDeadline && (
              <Button onClick={() => handleDeclareResult(options[1]?._id)}>
                Declare Result
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
