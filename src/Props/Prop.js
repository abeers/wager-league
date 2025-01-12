import { useEffect, useState } from 'react'
import { getProp } from '../api/data'
import { useParams } from 'react-router'

export default function Prop({ prop }) {
  const { prompt, propType } = prop

  return (
    <div>
      <h3>
        {prompt} ({propType})
      </h3>
    </div>
  )
}
