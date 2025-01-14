import { useState } from 'react'
import { deleteOption } from '../api/data'
import OverUnderProp from './OverUnderProp'
import BooleanProp from './BooleanProp'
import OpenAnswerProp from './OpenAnswerProp'
import MultipleChoiceProp from './MultipleChoiceProp'

export default function Prop({ prop, eventOwner, refreshEvent, user }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const { _id, prompt, propType, value, options } = prop

  const handleChange = (event) => {
    console.log('changing')
  }

  const handleClickedOption = (id) => {
    console.log('selectedOption: ', selectedOption)
    console.log('id: ', id)
    setSelectedOption(id)
  }

  const handleDeleteOption = (id) => {
    deleteOption(_id, id, user.token).then(refreshEvent)
  }
  console.log('user: ', user)
  console.log('eventOwner: ', eventOwner)
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
    </div>
  )
}
