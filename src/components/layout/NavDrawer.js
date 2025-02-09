import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router'

const baseUrl = '/wager-league'

export default function NavDrawer({ user, setUser }) {
  return (
    <Navbar expand='md' className='bg-body-tertiary mb-3'>
      <Container fluid>
        <Navbar.Brand className='title-text' href='/'>
          Wager League
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Wager League
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link as={Link} to={baseUrl}>
                Home
              </Nav.Link>
              {/* <Nav.Link as={Link} to='/leagues'>
                Leagues
              </Nav.Link> */}
              <Nav.Link as={Link} to={`${baseUrl}/events`}>
                Events
              </Nav.Link>
              <Nav.Link as={Link} to={`${baseUrl}/auth`}>
                {user.username ? user.username : 'Sign Up or Log In'}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
