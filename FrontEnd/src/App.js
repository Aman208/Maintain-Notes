import React from 'react';

import  Home from './Home';
import Login from './Auth/login';
import Profile from './Profile/Profile';
import ClientNotes from './Client_Notes/client_notes';
import { Route, BrowserRouter as Router , Switch} from 'react-router-dom';
import history from './Components/history';

import PrivateRoute from './Components/Helpers';

function App() {

   
  return (
    <div className="App">
       <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path = "/login" component={Login}/>
          <PrivateRoute path='/profile' component={Profile} /> 
          <PrivateRoute path='/notes:id' component ={ClientNotes}/>
         </Switch>
        </Router>
     </div>
  );
}

export default App;
