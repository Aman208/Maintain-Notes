import React, { Component } from "react";

import {Navbar , NavDropdown , Form , FormControl , Button , Nav } from 'react-bootstrap';


class ClientSearch extends Component {

 render(){
  return (
      
    <div style={{margin : "100px" }} >
   
    <Form inline >
      <FormControl type="text" placeholder="Search" className="mr-sm-4"  />
      <Button variant="outline-success">Search</Button>
    </Form>
    </div>
  )
 }
}

export default ClientSearch;