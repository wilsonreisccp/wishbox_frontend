import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="home">Wish Box</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item className="nav-link" as={Link} to="home">Home</Nav.Item>
        <Nav.Item className="nav-link" as={Link} to="friends">Friends</Nav.Item>
      </Nav>
    </Navbar>
  )
}

export default Header;