import { useEffect, useState } from 'react'
import {
  deleteOption,
  deleteProp,
  updateAnswer,
  updateResult,
} from '../api/data'
import OverUnderProp from './OverUnderProp'
import BooleanProp from './BooleanProp'
import OpenAnswerProp from './OpenAnswerProp'
import MultipleChoiceProp from './MultipleChoiceProp'
import { Button } from 'react-bootstrap'

export default function Prop({
  prop,
  eventId,
  eventOwner,
  pastDeadline,
  refreshEvent,
  user,
}) {
  const { _id, prompt, propType, value, options, answers, results } = prop
  const [selectedOption, setSelectedOption] = useState(answers[0]?.optionId)
  const [result, setResult] = useState(results[0]?.optionId)

  useEffect(() => {
    !pastDeadline && updateAnswer(eventId, _id, selectedOption, user.token)
  }, [user, eventId, _id, selectedOption, pastDeadline])

  const handleChange = (event) => {
    !pastDeadline && setSelectedOption(event.target.value)
  }

  const handleDeleteProp = (id) => {
    deleteProp(id, user.token).then(refreshEvent)
  }

  const handleDeclareResult = (id) => {
    setResult(id)
    updateResult(eventId, _id, id, user.token).then(refreshEvent)
  }

  const handleClickedOption = (id) => {
    !pastDeadline && setSelectedOption(id)
  }

  const handleDeleteOption = (id) => {
    deleteOption(_id, id, user.token).then(refreshEvent)
  }

  return (
    <div className='propWrapper'>
      <h3>{prompt}</h3>
      {propType === 'overUnder' && (
        <OverUnderProp
          options={options}
          selectedOption={selectedOption}
          result={result}
          value={value}
          isOwner={user._id === eventOwner._id}
          pastDeadline={pastDeadline}
          handleClickedOption={handleClickedOption}
          handleDeclareResult={handleDeclareResult}
        />
      )}
      {propType === 'boolean' && (
        <BooleanProp
          options={options}
          selectedOption={selectedOption}
          result={result}
          isOwner={user._id === eventOwner._id}
          pastDeadline={pastDeadline}
          handleClickedOption={handleClickedOption}
          handleDeclareResult={handleDeclareResult}
        />
      )}
      {propType === 'multipleChoice' && (
        <MultipleChoiceProp
          options={options}
          selectedOption={selectedOption}
          result={result}
          pastDeadline={pastDeadline}
          propId={_id}
          isOwner={user._id === eventOwner._id}
          handleClickedOption={handleClickedOption}
          handleDeleteOption={handleDeleteOption}
          handleDeclareResult={handleDeclareResult}
          refreshEvent={refreshEvent}
          token={user.token}
        />
      )}
      {propType === 'openAnswer' && (
        <OpenAnswerProp options={options} handleChange={handleChange} />
      )}
      {eventOwner._id === user._id && !pastDeadline && (
        <Button onClick={() => handleDeleteProp(_id)}>Delete</Button>
      )}
    </div>
  )
}
