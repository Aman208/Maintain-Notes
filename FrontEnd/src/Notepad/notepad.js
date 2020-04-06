import React, { Component } from "react";
import './notepad.css';
import { Container , Row  , Col , Form , Badge , Modal,Button , Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';


class Notepad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(Date.now()).format('llll'),
            client:{
              key:"" ,
             info:{ name : "" , email:"" , gender:"", contact:"" }
            } ,
            text:"" ,
            topic:"",
            show :false ,
           
        }

        this.updateTextArea = this.updateTextArea.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
    }

componentWillMount(){
    setInterval(() => this.setTime(), 60*1000);
 }

 handleClose = () => {this.setState({show:false})};
 handleShow = () =>   {this.setState({show:true})};



setTime = () => {
    this.setState({
       date: moment(Date.now()).format('llll')
    })
}


deleteNote =  () =>{
   
  this.props.flag();

} 



  updateTextArea = (event) => {
    const x = event.target.value;
      this.setState({text : x});
  };

  updateTopic = (event) =>{
    const x = event.target.value;
    this.setState({topic : x});
 
  }

  editNote =()=>{

    this.setState({text : "" ,topic:"Select Topic"});
  }
  
  saveNote = (key) => {

    let token = localStorage.getItem('token');
    

    fetch('https://afternoon-plateau-16689.herokuapp.com/notes/add', {
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
        
        this.deleteNote(key);
      })
      .catch((error) => {
        console.error(error);
        alert("Some Error")
      });



  }




 render(){

  let {client }  = this.props;

    
  return (
       <div class="body">
           <Container fluid class="container">
         
            <Row>
           
                <Col span={12}>
                <div class="mainapp">
                <div class="clean">
                    <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label > <h3 style={{color: "#3290B1" ,  }}><b>Name : {client.info.name}   &nbsp;&nbsp;  Gender : {client.info.gender}  &nbsp;&nbsp; Contact : {client.info.contact} </b> 
                    <Link to={{
                       pathname: `/notes:id=${client.key}`
                      }} >  <Badge  variant="secondary"> Previous Notes</Badge> </Link> </h3> </Form.Label>
                    
                    <Form.Control as="select" size="lg" value={this.state.topic} custom onChange={this.updateTopic}>
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
                    <Form.Control  onChange={this.updateTextArea} value={this.state.text}  as="textarea" rows="8" style={{fontSize: "35px" }}/>
                    </Form.Group>
                    </Form>
            

                </div>

                <div class="extra"> 
                    <div class="item" onClick={()=> this.editNote()}>    
                    <img class="active" src="https://s33.postimg.cc/4jx9l53pb/pencil.png" alt ="Edit"/>
                    <h3>Edit</h3>
                    </div>
                    <div class="item" onClick={()=> this.saveNote(client.key)}>
                    <img class="active" src="https://s33.postimg.cc/6bq8g3ki7/save.png" alt ="Save"/>
                    <h3>Save</h3>
                    </div>
                    <div class="item" onClick={() => this.handleShow()}>
                    <img class="active" src="https://s33.postimg.cc/jsn6yyfe7/bin.png"  alt="Del"
                    />
                    <h3>Delete</h3>
                     </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Do you want to delete this note ? </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.deleteNote}>
                      Delete This
                    </Button>
                  </Modal.Footer>
                </Modal>
              

                <div class=" btm"></div>
                </div>
           </Col>

            
                    </Row> }
            </Container>
         </div>
        
  

  )
 }
}

export default Notepad ;