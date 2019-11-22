import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import ManageUsers from './components/ManageUsers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/manage-users" component={ManageUsers}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
