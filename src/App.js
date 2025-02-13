import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Events from './Events/Events'
import Event from './Events/Event'
import LandingPage from './LandingPage/LandingPage'
// import Leagues from './Leagues/Leagues'
import AuthPage from './components/auth/AuthPage'
import NavDrawer from './components/layout/NavDrawer'
// import League from './Leagues/League'

const baseUrl = '/wager-league'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setUser(foundUser)
    }
  }, [])

  return (
    <>
      <NavDrawer user={user} setUser={setUser} />
      <Routes>
        <Route index path='' element={<LandingPage />} />
        <Route
          path={`${baseUrl}/auth`}
          element={<AuthPage user={user} setUser={setUser} />}
        />
        {/* <Route path='/leagues' exact element={<Leagues user={user} />} />
        <Route path='/leagues/:leagueId' element={<League user={user} />} /> */}
        <Route
          path={`${baseUrl}/events`}
          exact
          element={<Events user={user} />}
        />
        <Route
          path={`${baseUrl}/events/:eventId`}
          element={<Event user={user} />}
        />
      </Routes>
    </>
  )
}

export default App
