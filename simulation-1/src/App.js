import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'
import RouterRef from './Components/Router/RouterRef'
import Login from './Components/Pages/Login';

export class App extends Component {
  render() {
    return (
      <Router>  
        
        <div className='overlay-white-ish'/>

        <div>
            <RouterRef />
        </div>

      </Router>

    )
  }
}

export default App
