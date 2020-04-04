import React, { useState } from "react";
import { Button, FormGroup, Form } from "react-bootstrap";
import "./login.css";

import { useHistory } from "react-router-dom";

 function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [flag , setFlag] = useState(0);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }


  let history = useHistory();


  function handleSubmit(event) {
    event.preventDefault();
     
    fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email : email,
        password :password
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.token);
       
      localStorage.setItem('token', responseJson.token);
      history.push("/");
    })
    .catch((error) => {
      console.error(error);
      alert("Wrong Password")
    });
    

  }

  return (
    <div className="Login">
      
      <form onSubmit={handleSubmit}>
      <h3  >Verse Net. Login</h3>  
        <FormGroup controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;