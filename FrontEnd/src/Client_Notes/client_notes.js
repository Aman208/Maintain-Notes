import React, { useState, useEffect } from 'react';

import './clientNotes.css';
import Navbar from '../Components/Navbar';
import {Alert} from 'react-bootstrap';

function Client_Notes(props) {

   let x = ["Topic 1", "Topic 2", "Topic 3","Topic 4","Topic 5" ]
   let [topics ] = useState(x);
    let[client , setClient] = useState({});

   useEffect(()=>{
      let str = (props.match.params.id).slice(4);
      let x = JSON.parse(localStorage.getItem("clients"));
      let y = x.filter(el => el.key === str);  
       setClient(y[0].info);
       console.log(y[0].info);
   } , [props.match.params.id] )



   

    return (
      <div >
         <Navbar/>
       
         <Alert as="h2" key="1" variant='primary'>
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
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
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
                  <p>Swine pork belly prosciutto jowl pork chop chicken filet mignon cupim doner boudin.</p>
               </div>
            </li>
      </ul>
   </div>
    ) }

 </div>
    );
  }
  
  export default Client_Notes;










