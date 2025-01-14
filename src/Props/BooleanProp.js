import { Card } from 'react-bootstrap'

export default function BooleanProp({
  options,
  selectedOption,
  handleClickedOption,
}) {
  return (
    <div>
      <div className='propContainer'>
        <Card
          onClick={() => handleClickedOption(options[0]._id)}
          className={'propOption'}
          bg={options[0]?._id === selectedOption && 'primary'}>
          <Card.Body>{options[0].optionText}</Card.Body>
        </Card>

        <Card
          onClick={() => handleClickedOption(options[1]._id)}
          className={'propOption'}
          bg={options[1]?._id === selectedOption && 'primary'}>
          <Card.Body>{options[1].optionText}</Card.Body>
        </Card>
      </div>
    </div>
  )
}
