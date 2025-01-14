// import { useEffect, useState } from 'react'
// import { getProp } from '../api/data'
// import { useParams } from 'react-router'

import { Button } from 'react-bootstrap'
import CreateOptionForm from '../Options/CreateOptionForm'
import { deleteOption } from '../api/data'

export default function Prop({ prop, eventOwner, refreshEvent, user }) {
  const { _id, prompt, propType, value, options } = prop

  const handleDeleteOption = (id) => {
    deleteOption(_id, id, user.token).then(refreshEvent)
  }

  return (
    <div>
      <h3>{prompt}</h3>
      {propType === 'overUnder' && value}
      {options?.map(({ _id, optionText }) => (
        <>
          <h4>{optionText}</h4>
          {user._id === eventOwner._id && propType === 'multipleChoice' && (
            <Button onClick={() => handleDeleteOption(_id)}>Delete</Button>
          )}
        </>
      ))}
      {propType === 'multipleChoice' && user._id === eventOwner._id && (
        <CreateOptionForm
          propId={_id}
          refreshEvent={refreshEvent}
          token={user.token}
        />
      )}
    </div>
  )
}
