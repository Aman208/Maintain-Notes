import React from 'react';

import { Redirect , Route } from 'react-router-dom';



const PrivateRoute = ({component :Component , path ,...rest}) => (
<Route
{...rest}
 render = {props =>
   ( localStorage.getItem('token')!== null || localStorage.getItem('token')!== "") ? (
    <Component {...props} />
 ): ( <Redirect to={{
    pathname: "/login",
    state: {
      prevLocation: path,
      error: "You need to login first!"
    },
  }}
/>

)
}

/>

);


export default PrivateRoute;