import React, { useState,useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { isAuthenticated } from "../middleware/auth";

function Header() {
    
  // Function to calculate gold rate
  
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated()
  );

  const handleLogin = () => {
    
    setAuthenticated(true);
    
  };
  
  useEffect(()=>{
    handleLogin()
  },[])
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand> AC Gold Rate Calculator</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
            
            {authenticated ? (
              <Nav.Link href="/profile">Profile</Nav.Link>
            
          ) : (
            <Nav.Link href="/register">Register</Nav.Link>
          )}
          </Nav>
       
      </Navbar.Collapse>
      
    </Navbar>
   
  
  )
}

export default Header;
