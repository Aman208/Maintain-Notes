import React, { Component } from "react";


  import './profile.css'
  import {Container , Row , Col} from 'react-bootstrap';

  import Navbar from '../Components/Navbar';


 
  
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {};

    }

  

render() {
    return (<div   >

     
      <Container fluid style={{ marginTop: "0vh", minHeight: "100vh"  }}>
          <Row>
          <Col   >
          <Navbar activeItem="profile"/> 
          <User/>

          </Col>
          </Row>

          {/* <User/> */}
     </Container>
        </div>
        )
}
  }

  const User = () =>
{
    return <div id="main1">  
          <div className="user-container">
          <h1 className="title">Profile</h1>
          
          
          <div className="user-profile">
          <div class="avatar-container">
      <img src="https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Pics" class="avatar" />
    </div>

            <h2 className="user-name">Agent Name</h2>
            <h5 className="user-email">Email</h5>
            
          </div>
  </div>
  </div>

  }
  

export default Profile;



//fetch('https://afternoon-plateau-16689.herokuapp.com/notes', {
  //    method: 'GET',
  //    headers: {
  //      Accept: 'application/json',
  //      'Content-Type': 'application/json',
  //      'x-auth' : x
  //    },
  //    body: JSON.stringify({
  //       clientId : str, 
  //     }),
  //  }).then((response) => response.json())
  //  .then((responseJson) => {
   
  //    setNotes(responseJson);
  //    console.log(responseJson);
      
  //  })
  //  .catch((error) => {
  //    console.error(error);
  //    alert("Some Error Occur")
  //  });