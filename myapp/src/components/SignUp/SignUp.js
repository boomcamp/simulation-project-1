import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import { Link, Redirect } from 'react-router-dom';
import './signup.css';
import axios from 'axios';

export default class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      redirectTologin: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e.name)
    e.name === 'fname' ?
      this.setState({ firstName: e.value }) :
      e.name === 'lname' ?
        this.setState({ lastName: e.value }) :
        e.name === 'email' ?
          this.setState({ email: e.value }) :
          e.name === 'uname' ?
            this.setState({ username: e.value }) :
            this.setState({ password: e.value })
  }

  handleClick() {
    axios
      .post('http://localhost:3000/register', this.state)
      .then(res => localStorage.setItem("token", res.data.accessToken))
    this.setState({ redirectTologin: true })
  }

  render() {
    console.log(this.state)
    if (this.state.redirectTologin || localStorage.getItem(this.state)) {
      return (<Redirect to={'/signin'} />)
    }
   
    return (
      <div className='signUpcss'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <form>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="First name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name='fname'
                    onChange={(e) => this.handleChange(e.target)}
                  />

                  <MDBInput
                    label="Last name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name='lname'
                    onChange={(e) => this.handleChange(e.target)}
                  />
                  <MDBInput
                    label="Username"
                    icon="file-signature"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name='uname'
                    onChange={(e) => this.handleChange(e.target)}
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    name='email'
                    onChange={(e) => this.handleChange(e.target)}
                  />
                  <MDBInput
                    label="Password"
                    icon="lock"
                    group
                    type="password"
                    name='password'
                    onChange={(e) => this.handleChange(e.target)}
                    validate
                  />
                  <MDBBtn onClick={this.handleClick} color="whitesmoke">Sign up</MDBBtn>
                  <Link to="/signin"><MDBBtn onClick={this.handleClick} color="whitesmoke">Log In</MDBBtn></Link>
                </div>

              </form>

            </MDBCol>
          </MDBRow>
        </MDBContainer>

      </div>
    )
  }
}
