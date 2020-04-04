import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
function Navbar() {
    
        return (
            <div style={{marginTop:"10px" , background:"#22a4b4" }}>
 <Nav justify variant="tabs" defaultActiveKey="/home">
  <Nav.Item as={Link} to="/">
    <Nav.Link as="h3">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item as={Link} to="/profile">
    <Nav.Link as="h3">Profile</Nav.Link>
  </Nav.Item>
  
  <Nav.Item as={Link} onClick={() =>  localStorage.setItem('token', '') } to="/login">
    <Nav.Link as="h3" >SignOut </Nav.Link>
  </Nav.Item>
</Nav>
            </div>
        );
    
}

export default Navbar;