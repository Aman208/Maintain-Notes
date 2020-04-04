import React , {Component} from 'react';
import axios from 'axios';
import {Form, Button , Container , Row , Col } from 'react-bootstrap';



import Notepad from './Notepad/notepad';
import  Navbar from './Components/Navbar';

import './Client_Search/search.css';

class  Home extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          query: "",
          clients: [],
          filteredData: [] ,

          selectClients:[]

        };
    
    
         this.getData = this.getData.bind(this);
    };

    componentWillMount(){
      let x = JSON.parse(localStorage.getItem("clients"));
       if(x!==null)
       {this.setState({selectClients : x });}
       else{
        this.setState({selectClients : []});
       }
    }


   
    
      handleInputChange = event => {
        const query = event.target.value;
          this.getData(query);
           this.setState({query : query });
    
      };
    
      getData = (val) => {
         
        axios({
          method: 'post',
          url: `http://localhost:4000/client`,
          data: {
            name: val
          }
        })
        .then(data => {
          var clients = data.data.clients;
          const { query } = this.state;
          const filteredData = clients.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
    
          this.setState({
            clients : clients,
            filteredData
          });
         });
      };


   selectClient =  (id , name , gender , contact) => {
           let x = {name , gender , contact };
          
           let y = JSON.parse(localStorage.getItem("clients"));
            if(y===null){
              y =[];
            }
            y.push({ key:id , info:x });
            localStorage.setItem("clients", JSON.stringify(y)); 
            this.setState({selectClients : y});

   }

 render(){
  return (
    <div className="App">
     <Navbar/>

     <div style={{width:"90%" , marginTop:"20px" ,padding : "10px" }}>
      <Container style={{background:"white"}}>
        <Row>
          <Col sm={10}  >
            <Form>
            <Form.Control
            type="text"  
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
            onfocusout={(e)=> this.setState({query : ""}) }
            />
            </Form>

          </Col>

        <Col sm={2}  >
        <Button>Add Client</Button>
        </Col>

        </Row>
        <br/>
        <Row>
         <Col sm={12}> 
          {this.state.query !== "" ?
           <div><table id="t01">
          <tr>
            <th>Name</th>
            <th>Email</th> 
            <th>Gender</th>
            <th>Contact</th>
          </tr>
          {this.state.filteredData.map(i =>  
            <tr onClick={() => this.selectClient(i._id , i.name , i.gender , i.contact)} >
            <td>{i.name}</td>
            <td>{i.email}</td>
            <td>{i.gender}</td>
            <td>{i.contact}</td>
          </tr>
          )}

             </table>

           </div> :null }
          </Col>
         </Row>
      </Container>
       </div>
    
    <Notepad selectClients={this.state.selectClients} />
     
    </div>
  );
 }
}

export default Home;



  
