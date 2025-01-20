import { useEffect, useState } from 'react'
import {
  deleteOption,
  deleteProp,
  updateAnswer,
  updateOpenAnswer,
  updateOpenResult,
  updateResult,
} from '../api/data'
import OverUnderProp from './OverUnderProp'
import BooleanProp from './BooleanProp'
import OpenAnswerProp from './OpenAnswerProp'
import MultipleChoiceProp from './MultipleChoiceProp'
import TrashButton from '../components/layout/TrashButton'

export default function Prop({
  prop,
  eventId,
  eventOwner,
  pastDeadline,
  refreshEvent,
  user,
}) {
  const { _id, prompt, propType, value, options, answers, results } = prop
  const [selectedOption, setSelectedOption] = useState(answers?.optionId)
  const [openAnswer, setOpenAnswer] = useState(
    options?.find(({ _id }) => answers?.optionId === _id)?.optionText || ''
  )
  const [openResult, setOpenResult] = useState(
    options?.find(({ _id }) => results?.optionId === _id)?.optionText || ''
  )
  const [result, setResult] = useState(results?.optionId)

  useEffect(() => {
    !pastDeadline && updateAnswer(eventId, _id, selectedOption, user.token)
  }, [user, eventId, _id, selectedOption, pastDeadline])

  const handleOpenAnswerBlur = () => {
    !pastDeadline && updateOpenAnswer(eventId, _id, openAnswer, user.token)
  }

  const handleOpenAnswerChange = (event) => {
    !pastDeadline && setOpenAnswer(event.target.value)
  }

  const handleOpenResultChange = (event) => {
    pastDeadline && setOpenResult(event.target.value)
  }

  const handleDeleteProp = (id) => {
    deleteProp(id, user.token).then(refreshEvent)
  }

  const handleDeclareResult = (id) => {
    setResult(id)
    updateResult(eventId, _id, id, user.token).then(refreshEvent)
  }

  const handleDeclareOpenResult = () => {
    updateOpenResult(eventId, _id, openResult, user.token).then(refreshEvent)
  }

  const handleClickedOption = (id) => {
    !pastDeadline && setSelectedOption(id)
  }

  const handleDeleteOption = (id) => {
    deleteOption(_id, id, user.token).then(refreshEvent)
  }

  return (
    <div className='propWrapper'>
      {eventOwner._id === user._id && !pastDeadline && (
        <TrashButton onClick={() => handleDeleteProp(_id)} />
      )}
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
        <OpenAnswerProp
          openAnswer={openAnswer}
          openResult={openResult}
          pastDeadline={pastDeadline}
          isOwner={user._id === eventOwner._id}
          handleOpenAnswerBlur={handleOpenAnswerBlur}
          handleOpenAnswerChange={handleOpenAnswerChange}
          handleOpenResultChange={handleOpenResultChange}
          handleDeclareOpenResult={handleDeclareOpenResult}
        />
      )}
    </div>
  )
}
