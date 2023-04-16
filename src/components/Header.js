import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    
  // Function to calculate gold rate
  
  

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Gold Rate Calculator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
       
      </Navbar.Collapse>
      
    </Navbar>
   
  
  )
}

export default Header;
