import React, { useState, useEffect } from 'react';

import './clientNotes.css';
import Navbar from '../Components/Navbar';
import {Alert} from 'react-bootstrap';

function Client_Notes(props) {

   let x = ["Topic 1", "Topic 2", "Topic 3","Topic 4","Topic 5" ]
   let [topics ] = useState(x);
    let[client , setClient] = useState({});
    let [notes  , setNotes] = useState([]);

   useEffect( async ()=>{
      let str = (props.match.params.id).slice(4);
      
      let z = await localStorage.getItem("token");
     
fetch('https://afternoon-plateau-16689.herokuapp.com/notes', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'x-auth' : z
     },
     body: JSON.stringify({
        clientId : str, 
      }),
   }).then((response) => response.json())
   .then((responseJson) => {
     setNotes(responseJson);
     console.log(responseJson);
   })
   .catch((error) => {
     console.error( "Error:" ,error );
   });
       
   let y = JSON.parse(localStorage.getItem("client"));
      setClient(y.info);

   } , [props.match.params.id] )



   

    return (
      <div >
         <Navbar/>
       
         <Alert  key="1" variant='primary' style={{fontSize:"25px"}}>
            Name: {client.name}<br/>
            Gender : {client.gender}<br/>
            Contact : {client.contact}
          </Alert>
         { topics.map( i  => 
       <div class="timeline-wrap" style={{background:"#272727"}}>
         <ul class="timeline timeline--first">

            <li class="era">
               <h2 class="era__title">{i}</h2>
            </li>
            
            
                 <li class="entry entry--left">
                 <div class="entry__content wow animated fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                    <h2>Bacon Ipsum</h2>
                    <p>Lorem Ipsum is simply dummy text release of Letraset sheets containing Lorem Ipsum passages,  </p>
                 </div>
              </li> 
              
            
               <li class="entry entry--right">
               <div class="entry__content wow animated fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                  <h2>Bacon Ipsum</h2>
                  <p>Ground round short ribs fatback, salami shoulder sausage chuck shankle landjaeger drumstick ribeye meatloaf doner.</p>
               </div>
              </li> 
              <li class="entry entry--left">
               <div class="entry__content wow animated fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                  <h2>Bacon Ipsum</h2>
                  <p>Lorem Ipsum is simply dummy text release of Letraset sheets containing Lorem Ipsum passages,  </p>
               </div>
            </li>
            
                
            
      </ul>
   </div>
    ) }

 </div>
    );
  }
  
  export default Client_Notes;










