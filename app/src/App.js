import React, { Component } from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";


import Login from './Components/Login'
import Register from './Components/Register'
import ManageUser from './Components/ManageUser'
import Navigation from './Components/Navigation'
import Logout from './Components/Logout'

export default class App extends Component{


  render(){
    return (
      
      <Router>
        <Switch>
          
          <Route path="/" component={Login} exact/>
          <Route path="/register" component={Register} />
          <Route path="/manage-users" component={ManageUser} />
          <Route path="/logout" component={Logout}/>
        </Switch>
          
      </Router>
    );
  }
}
