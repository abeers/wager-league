import './App.css'
import { Route, Routes } from 'react-router'
import Events from './Events/Events'
import LandingPage from './LandingPage/LandingPage'
import Leagues from './Leagues/Leagues'
import Results from './Results/Results'

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path='/leagues' element={<Leagues />} />
      <Route path='/events' element={<Events />} />
      <Route path='/results' element={<Results />} />
    </Routes>
  )
}

export default App
