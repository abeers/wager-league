import { useEffect, useState } from 'react'
import { deleteOption, deleteProp, updateAnswer } from '../api/data'
import OverUnderProp from './OverUnderProp'
import BooleanProp from './BooleanProp'
import OpenAnswerProp from './OpenAnswerProp'
import MultipleChoiceProp from './MultipleChoiceProp'
import { Button } from 'react-bootstrap'

export default function Prop({ prop, eventOwner, refreshEvent, user }) {
  const { _id, prompt, propType, value, options, answers } = prop
  const [selectedOption, setSelectedOption] = useState(answers[0]?.optionId)

  useEffect(() => {
    updateAnswer(_id, selectedOption, user.token)
  }, [user, _id, selectedOption])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleDeleteProp = (id) => {
    deleteProp(id, user.token).then(refreshEvent)
  }

  const handleClickedOption = (id) => {
    setSelectedOption(id)
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
          value={value}
          handleClickedOption={handleClickedOption}
        />
      )}
      {propType === 'boolean' && (
        <BooleanProp
          options={options}
          selectedOption={selectedOption}
          handleClickedOption={handleClickedOption}
        />
      )}
      {propType === 'multipleChoice' && (
        <MultipleChoiceProp
          options={options}
          selectedOption={selectedOption}
          propId={_id}
          isOwner={user._id === eventOwner._id}
          handleClickedOption={handleClickedOption}
          handleDeleteOption={handleDeleteOption}
          refreshEvent={refreshEvent}
          token={user.token}
        />
      )}
      {propType === 'openAnswer' && (
        <OpenAnswerProp options={options} handleChange={handleChange} />
      )}
      {eventOwner._id === user._id && (
        <Button onClick={() => handleDeleteProp(_id)}>Delete</Button>
      )}
    </div>
  )
}
