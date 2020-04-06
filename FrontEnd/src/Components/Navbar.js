import React from 'react';
import {Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
function Navbar() {
    
        return (
            <div style={{marginTop:"10px" , background: "#3290B1" }}>
 <Nav style={{Color:"white"}} justify variant="tabs" defaultActiveKey="/home">
  <Nav.Item as={Link} to="/">
    <Nav.Link style={{color:"white"}} as="h3">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item as={Link} to="/profile">
    <Nav.Link style={{color:"white"}} as="h3">Profile</Nav.Link>
  </Nav.Item>
  
  <Nav.Item as={Link} onClick={ async () => { await localStorage.setItem('token', '');  localStorage.setItem('client' ,null);} } to="/login">
    <Nav.Link style={{color:"white"}} as="h3" >SignOut </Nav.Link>
  </Nav.Item>
</Nav>
            </div>
        );
    
}

export default Navbar;