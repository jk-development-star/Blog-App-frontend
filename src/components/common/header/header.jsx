import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  const getUserFromLocalStorage = () => {
    const resultString = localStorage.getItem('user');
    return resultString ? JSON.parse(resultString) : null;
  };

  const user = getUserFromLocalStorage();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Implement other logout logic here
    console.log('Logout clicked');

    // Hide the header
    setShowHeader(false);

    // Optionally, you can navigate to a login page or the home page after logout
    navigate('/');
  };

  useEffect(() => {
    // Hide the header on the login page
    if (location.pathname === '/') {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);

   return showHeader ? (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-header">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user && (
              <Nav.Link>
                Welcome, {user.user_name || 'User'}
              </Nav.Link>
            )}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : null;
};

export default Header;
