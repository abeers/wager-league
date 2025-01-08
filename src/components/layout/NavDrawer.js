import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router'
// import AuthPage from '../auth/AuthPage'

export default function NavDrawer({ user, setUser }) {
  return (
    <Navbar expand='md' className='bg-body-tertiary mb-3'>
      <Container fluid>
        <Navbar.Brand href='/'>Wager League</Navbar.Brand>
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
              <Nav.Link>
                <Link to='/'>Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/leagues'>Leagues</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/events'>Events</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to='/results'>Results</Link>
              </Nav.Link>
              {/* <NavDropdown
                title='Dropdown'
                id={`offcanvasNavbarDropdown-expand`}>
                <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action4'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action5'>
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link>
                <Link to='/auth'>
                  {user.username ? user.username : 'Sign Up or Log In'}
                </Link>
              </Nav.Link>
            </Nav>
            {/* <AuthPage user={user} setUser={setUser} /> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
