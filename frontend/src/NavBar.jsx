import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from './AuthProvider';

const NavBar = () => {
  const { token } = useContext(AuthContext);
  return (
    <Navbar bg="light" variant="light" expand="lg" className="w-100">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          Jobly
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to={'/companies'}>
                  Companies
                </Nav.Link>
                <Nav.Link as={Link} to={'/jobs'}>
                  Jobs
                </Nav.Link>
                <Nav.Link as={Link} to={'/profile'}>
                  Profile
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={'/login'}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={'/signup'}>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
