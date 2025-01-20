import { Link } from 'react-router'

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div>
        <h1>Wager League</h1>
        <p>
          Join a league, virtually bet on the prompts, and get those bragging
          rights!
        </p>
      </div>
      <div className='landing-container'>
        <Link to='/leagues' className='landing-call-to-action'>
          <h2>Leagues</h2>
          <p>
            Create or join a league with a group of friends to keep track of
            results over many events
          </p>
        </Link>
        <Link to='/events' className='landing-call-to-action'>
          <h2>Events</h2>
          <p>
            Create or join an event to predict as many or as few results as you
            like
          </p>
        </Link>
      </div>
      <Link to='/auth'>Sign Up or Log In Now!</Link>
    </div>
  )
}
