import React, { Component } from 'react'
import './signin.css'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirectTohomepage: false
    }
    this.logIn = this.logIn.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  logIn(e) {
    console.log(e)
    e.name ==='email'?
    this.setState({ email: e.value}):
   
    this.setState({password:e.value})

   
  }
  handleClick() {

    axios
      .post("http://localhost:3000/login", this.state)
      .then(result => {
        console.log(result.data)
        localStorage.setItem("token", result.data.accessToken)})
      this.setState({ redirectTohomepage: true });
    console.log(this.state)
  }   
  render() {
    if (this.state.redirectTohomepage || localStorage.getItem(this.state)) {
      return (<Redirect to={'/homepage'} />)
    }
    return (
      <div className='mainContainer'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name='email'
                    onChange={(e) => this.logIn(e.target)}
                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    name='password'
                    onChange={(e) => this.logIn(e.target)}
                    required
                  />
                  <div className="text-center" >
                    <MDBBtn color='whitesmoke' className='left' onClick={this.handleClick}>Login</MDBBtn>
                    <Link to='/' > <MDBBtn color='whitesmoke' id='signUp' >Sign Up</MDBBtn></Link>
                  </div>
                </div>

              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )
  }
}
