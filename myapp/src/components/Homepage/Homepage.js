import React, { Component } from 'react'
import axios from 'axios'
export default class Homepage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
componentDidMount(){
  if(localStorage.getItem('token') == null){
    this.props.history.push('/')
  }
}

handleLogout =() =>{
   localStorage.clear('token')
   this.props.history.push('/')
}

  render() {


    return (
      <div>
        <h1>HOME DELOPHANE</h1>

        <button onClick={this.handleLogout} >Logout</button>
      </div>
    )
  }
}
