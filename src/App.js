import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Events from './Events/Events'
import LandingPage from './LandingPage/LandingPage'
import Leagues from './Leagues/Leagues'
import Results from './Results/Results'
import AuthPage from './components/auth/AuthPage'

function App() {
  const [user, setUser] = useState({
    token: null,
  })
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route
        path='/auth'
        element={<AuthPage user={user} setUser={setUser} />}
      />
      <Route path='/leagues' element={<Leagues />} />
      <Route path='/events' element={<Events />} />
      <Route path='/results' element={<Results />} />
    </Routes>
  )
}

export default App
