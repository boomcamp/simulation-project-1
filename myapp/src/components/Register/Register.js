import React, { Component } from "react";
import "./register.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBModalFooter
} from "mdbreact";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      plainPassword: "",
      redirectToReferrer: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    e.name === "email"
      ? this.setState({ email: e.value })
      : e.name === "fname"
      ? this.setState({ firstName: e.value })
      : e.name === "lname"
      ? this.setState({ lastName: e.value })
      : e.name === "username"
      ? this.setState({ username: e.value })
      : e.name === "password"
      ? this.setState({ password: e.value })
      : this.setState({ plainPassword: e.value });
  }
  handleRegister() {
    const { password, plainPassword } = this.state;
    if (password !== plainPassword) {
      alert("Passwords don't match");
    } else {
      axios.post("http://localhost:3000/register", this.state).then(result => {
        console.log(result);
        localStorage.setItem("token", result.data.accessToken);
        this.setState({ redirectToReferrer: true });
      });
    }
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };
  render() {
    if (this.state.redirectToReferrer || localStorage.getItem(this.state)) {
      return <Redirect to={"/"} />;
    }
    if (localStorage.getItem(this.state)) {
      return <Redirect to={"/usermanage"} />;
    }
    return (
      <div className="signup">
        <MDBContainer className="container">
          <MDBRow>
            <MDBCol md="12">
              <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                noValidate
              >
                <p className="h5 text-center mb-4">SIGN UP</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                  <MDBInput
                    label="Username"
                    icon="user"
                    group
                    type="text"
                    name="username"
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                  <MDBInput
                    label="First name"
                    icon="users"
                    group
                    type="text"
                    name="fname"
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                  <MDBInput
                    label="Last name"
                    icon="users"
                    group
                    type="text"
                    name="lname"
                    validate
                    error="wrong"
                    success="right"
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    name="password"
                    group
                    type="password"
                    validate
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                  <MDBInput
                    label="Confirm password"
                    icon="lock"
                    name="plainPassword"
                    group
                    type="password"
                    validate
                    onChange={e => this.handleChange(e.target)}
                    required
                  />
                  <div className="invalid-feedback"></div>
                  <div className="valid-feedback"></div>
                </div>
                <div className="text-center">
                  <MDBBtn
                    color="primary"
                    onClick={this.handleRegister}
                    type="submit"
                  >
                    Register
                  </MDBBtn>
                </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>
                    <Link to="/">
                      <b>Go back to login</b>
                    </Link>
                  </p>
                </div>
              </MDBModalFooter>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
