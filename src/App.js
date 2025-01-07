import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Events from './Events/Events'
import LandingPage from './LandingPage/LandingPage'
import Leagues from './Leagues/Leagues'
import Results from './Results/Results'
import AuthPage from './components/auth/AuthPage'
import NavDrawer from './components/layout/NavDrawer'

function App() {
  const [user, setUser] = useState({
    token: null,
  })
  return (
    <>
      <NavDrawer user={user} setUser={setUser} />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path='/auth'
          element={<AuthPage user={user} setUser={setUser} />}
        />
        <Route path='/leagues' element={<Leagues user={user} />} />
        <Route path='/events' element={<Events />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </>
  )
}

export default App
