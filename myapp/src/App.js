import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Homepage from './components/Homepage/Homepage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <div className='regLogContainer'>
        <BrowserRouter>
          <Switch>
            <Route component={SignIn} path='/signin'></Route>
            <Route exact component={SignUp} path='/'></Route>
            <Route component={Homepage} path='/homepage'></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
