import React, { Component } from "react";
import './notepad.css';
import { Container , Row  , Col , Form} from 'react-bootstrap';

import moment from 'moment';

class Notepad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment(Date.now()).format('llll'),
            selectClients:[] ,
        }
    }


setTime = () => {
        this.setState({
           date: moment(Date.now()).format('llll')
        })
}

componentWillMount(){
    setInterval(() => this.setTime(), 60*1000);
    
   this.setState({selectClients :this.props.selectClients })
 }


deleteNote = async (key) =>{

    let x = JSON.parse(localStorage.getItem("clients"));
    
     x = x.filter(el => el.key !== key);
     localStorage.setItem("clients" , JSON.stringify(x));
     this.setState({selectClients : x});

} 

componentDidUpdate(prevProps , prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectClients !== prevState.selectClients) {
       
            this.componentWillMount();
    }
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
                    <Form.Label> <h3> Name : {client.info.name} &nbsp;&nbsp;  Gender : {client.info.gender} &nbsp;&nbsp; Contact : {client.info.contact} </h3> </Form.Label>
                    
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
            
                    <h3 class="date">{this.state.date}</h3>
                    <br/>
                    <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label as="h3">Write Your Notes Here</Form.Label>
                    <Form.Control  as="textarea" rows="8" style={{fontSize: "35px" }}/>
                    </Form.Group>
                    </Form>
            

                </div>

                <div class="extra"> 
                    <div class="item" onClick={()=> this.EditNote(client.key)}>    
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