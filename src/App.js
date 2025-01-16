import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Events from './Events/Events'
import Event from './Events/Event'
import LandingPage from './LandingPage/LandingPage'
import Leagues from './Leagues/Leagues'
import Results from './Results/Results'
import AuthPage from './components/auth/AuthPage'
import NavDrawer from './components/layout/NavDrawer'
import League from './Leagues/League'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      console.log('loggedInUser: ', loggedInUser)
      const foundUser = JSON.parse(loggedInUser)
      console.log('foundUser: ', foundUser)
      setUser(foundUser)
    }
  }, [])

  console.log('user: ', user)
  return (
    <>
      <NavDrawer user={user} setUser={setUser} />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path='/auth'
          element={<AuthPage user={user} setUser={setUser} />}
        />
        <Route path='/leagues' exact element={<Leagues user={user} />} />
        <Route path='/leagues/:leagueId' element={<League user={user} />} />
        <Route path='/events' exact element={<Events user={user} />} />
        <Route path='/events/:eventId' element={<Event user={user} />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </>
  )
}

export default App
