import { useEffect, useState } from 'react'
import api from '../api/data'

export default function Results() {
  const [results, setResults] = useState(['4-2', '0-5', 'Did not play'])

  // useEffect(() => {
  //   api
  //     .getAllResults()
  //     .then((response) => response.json())
  //     .then(({ results }) => setResults(results))
  //     .catch(console.error)
  // }, [])

  return (
    <div className='landing-page'>
      <div>
        <h1>Results</h1>
        <p>View your results</p>
      </div>
      <ul>
        {results?.map((result) => (
          <li>{result}</li>
        ))}
      </ul>
    </div>
  )
}
