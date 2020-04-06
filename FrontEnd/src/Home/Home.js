import React , {Component} from 'react';
import axios from 'axios';
import {Form, Button , Spinner,Container , Row , Col } from 'react-bootstrap';

import Notepad from '../Notepad/notepad';
import  Navbar from '../Components/Navbar';

import './search.css';

class  Home extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          query: "",
          clients: [],
          filteredData: [] ,
          flag:0,
          selectClient:{
             key:"" ,
             info : { name : "" , email:"" , gender:"", contact:"" }
          } ,
          loading : false

        };
    
    
         this.getData = this.getData.bind(this);
         this.handleflag = this.handleflag.bind(this);
    };

  async componentWillMount(){
       
      let x = await JSON.parse(localStorage.getItem("client"));
       if(x!==null)
       {this.setState({selectClient : x  , flag:1});}
      
  }

   async handleflag(){

      this.setState({flag :0 });
      await localStorage.setItem('client' ,null);

    }


   
    
    handleInputChange = event => {
        const query = event.target.value;
          this.getData(query);
           this.setState({query : query });
    
      };
    
    getData = (val) => {
         
        this.setState({loading:true});
        axios({
          method: 'post',
          url: `https://afternoon-plateau-16689.herokuapp.com/client`,
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
            filteredData,
            loading:false
          });
         });
      };


   selectClient = async (id , name , gender , contact , email) => {
         
        let x = {name , gender , contact , email }
           
      
        this.setState({selectClient :{key : id , info:x} , flag:1 });

        await localStorage.setItem("client" , JSON.stringify({key : id , info:x}));

        

   }

 render(){
  return (
    <div className="App">
     <Navbar/>

     <div style={{width:"100%" , marginTop:"20px" ,padding : "10px" }}>
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
            <tr onClick={() => this.selectClient(i._id , i.name , i.gender , i.contact , i.email)} >
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
          
          <Row>
            <Col>
         {this.state.loading ? <div style={{textAlign: "center"}}>
           <Spinner animation="grow" variant="primary" />
           <Spinner animation="grow" variant="secondary" />
           <Spinner animation="grow" variant="success" />
           <Spinner animation="grow" variant="danger" />
           <Spinner animation="grow" variant="warning" />
           <Spinner animation="grow" variant="info" />
           <Spinner animation="grow" variant="light" />
           <Spinner animation="grow" variant="dark" />
           </div> : null}
           </Col></Row>
      </Container>
       </div>
    {this.state.flag ?  <Notepad client={this.state.selectClient} flag ={this.handleflag} /> : null }
   
     
    </div>
  );
 }
}

export default Home;



  
