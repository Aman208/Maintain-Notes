import React, { Component } from "react";
import './notepad.css';
import { Container , Row  , Col , Form , Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';


class Notepad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(Date.now()).format('llll'),
            selectClients:[] ,
            text:""
        }
    }

componentWillMount(){
    setInterval(() => this.setTime(), 60*1000);
    
   this.setState({selectClients :this.props.selectClients })
 }
 componentDidUpdate(prevProps , prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectClients !== prevState.selectClients) {
       
            this.componentWillMount();
    }
  }


setTime = () => {
    this.setState({
       date: moment(Date.now()).format('llll')
    })
}


deleteNote = async (key) =>{

    let x = JSON.parse(localStorage.getItem("clients"));
     x = x.filter(el => el.key !== key);
     localStorage.setItem("clients" , JSON.stringify(x));
     this.setState({selectClients : x});

} 



  updateTextArea = (event , key) => {
    const x = event.target.value;
      this.setState({text : x});
  };
  
  saveNote = (key) => {

    let token = localStorage.getItem('token');

    fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth' : token
        },
        body: JSON.stringify({
          text : this.state.text,
          clientId :key
         }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
         
        alert("Success");
        this.deleteNote(key);
      })
      .catch((error) => {
        console.error(error);
        alert("Some Error")
      });



  }




 render(){

    
  return (
       <div class="body">
           <Container fluid class="container">
            <Row>
            {this.state.selectClients.map(client => 
                <Col span={12}>
                <div class="mainapp">
                <div class="clean">
                    <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label > <h3 style={{color: "#3290B1" ,  }}><b>Name : {client.info.name}  &nbsp;&nbsp;  Gender : {client.info.gender} &nbsp;&nbsp; Contact : {client.info.contact} </b> 
                    <Link to={{
                       pathname: `/notes:id=${client.key}`
                      }} >  <Badge  variant="secondary"> Previous Notes</Badge> </Link> </h3> </Form.Label>
                    
                    <Form.Control as="select" size="lg" custom>
                        <option>Select Topic</option>
                        <option>Topic 1</option>
                        <option>Topic 2</option>
                        <option>Topic 3</option>
                        <option>Topic 4</option>
                        <option>Topic 5</option>
                    </Form.Control>
                    </Form.Group>
                    </Form>
            
                    <h3 style={{color: "#3290B1" }} class="date"><b>{this.state.date}</b></h3>
                    <br/>
                    <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label as="h3">Write Your Notes Here</Form.Label>
                    <Form.Control  onChange={(e)=> this.updateTextArea(e, client.key)}  as="textarea" rows="8" style={{fontSize: "35px" }}/>
                    </Form.Group>
                    </Form>
            

                </div>

                <div class="extra"> 
                    <div class="item" onClick={()=> this.editNote(client.key)}>    
                    <img class="active" src="https://s33.postimg.cc/4jx9l53pb/pencil.png" alt ="Edit"/>
                    <h3>Edit</h3>
                    </div>
                    <div class="item" onClick={()=> this.saveNote(client.key)}>
                    <img class="active" src="https://s33.postimg.cc/6bq8g3ki7/save.png" alt ="Save"/>
                    <h3>Save</h3>
                    </div>
                    <div class="item" onClick={() => this.deleteNote(client.key)}>
                    <img class="active" src="https://s33.postimg.cc/jsn6yyfe7/bin.png"  alt="Del"
                    />
                    <h3>Delete</h3>
                     </div>
                </div>
              

                <div class=" btm"></div>
                </div>
           </Col>

            )}
            </Row>
            </Container>
         </div>
        
  

  )
 }
}

export default Notepad ;