import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ManageUser from './components/ManageUser';


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={SignIn}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/manage-users' component={ManageUser}/>
        </Switch>
    </Router>
  );
}

export default App;
