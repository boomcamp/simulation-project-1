import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBModalFooter
} from "mdbreact";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./login.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.login = this.login.bind(this);
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };
  login() {
    if (this.state.email && this.state.password) {
      axios
        .post("http://localhost:3000/login", this.state)
        .then(result => {
          //console.log("Succesfully login!");
          toast.success(`Welcome! ${this.state.email}`);
          localStorage.setItem("token", result.data.accessToken);
          this.setState({ redirectToReferrer: true });
        })
        .catch(err => {
          alert("Incorrect email or password");
        });
    }
  }

  changeHandler = e => {
    e.name === "email"
      ? this.setState({ email: e.value })
      : this.setState({ password: e.value });
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/usermanage"} />;
    }

    if (localStorage.getItem(this.state)) {
      return <Redirect to={"/usermanage"} />;
    }
    return (
      <div className="body">
        <div className="login">
          <MDBContainer className="container">
            <MDBRow>
              <MDBCol md="12">
                <form
                  className="needs-validation"
                  onSubmit={this.submitHandler}
                  noValidate
                >
                  <p className="h5 text-center mb-4">SIGN IN</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="text"
                      name="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={e => this.changeHandler(e.target)}
                      required
                    >
                      <div className="invalid-feedback">
                        Please input your email.
                      </div>
                      <div className="valid-feedback"></div>
                    </MDBInput>
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.password}
                      onChange={e => this.changeHandler(e.target)}
                      required
                    >
                      <div className="invalid-feedback">
                        Please input your password.
                      </div>
                      <div className="valid-feedback"></div>
                    </MDBInput>
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit" onClick={this.login}>
                      Login
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>
                      Not a member?{" "}
                      <Link to="/register">
                        <b style={{ color: "#2bbbad" }}>Sign Up</b>
                      </Link>
                    </p>
                  </div>
                </MDBModalFooter>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}
