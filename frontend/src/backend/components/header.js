// Header.js
import React from 'react';
import { Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
    </Navbar>
  );
}

export default Header;
