import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';

import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import ManageUsers from './components/ManageUsers/ManageUsers'

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/manage-users" component={ManageUsers}/>
            </Switch>
          </BrowserRouter>
        </div>
    </SnackbarProvider>
  );
}

export default App;