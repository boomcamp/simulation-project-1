import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navigation from "./Navigation";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        email: "",
        password: ""
      },
      redirect: false,
      passLength: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/manage-users",
            state: true
          }}
        />
      );
    }
  };

  updateValue = e => {
    // this.setState({
    //   data: {
    //     ...this.state.data,
    //     [e.target.name]: e.target.value
    //   }
    // })
      if(e.target.value.length > 4){
        this.setState({
          ...this.state,
          passLength: true,
          data: {
            ...this.state.data,
            [e.target.name]: e.target.value
          }
        })
      }else{
        this.setState({
          ...this.state,
          passLength: false,
          data: {
            ...this.state.data,
            [e.target.name]: e.target.value
          }
        })
      }
  };

  loginFn = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:4000/login`,
      data: this.state.data
    })
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem("accessToken", data.data.accessToken);
          this.setState({
            ...this.state,
            redirect: true
          });
        } else {
          console.log("error");
        }
      })

      .catch(err => console.log(err));
  };

  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
        <Navigation />
        {this.renderRedirect()}
        <form onSubmit={this.loginFn}>
          <CssBaseline />
          <Container maxWidth="sm" className="login-cont">
            <h1>Sign-in</h1>

            <TextField
              required
              label="E-mail"
              defaultValue={email}
              name="email"
              className="textBox"
              margin="normal"
              variant="outlined"
              type="email"
              onChange={e => this.updateValue(e)}
            />
            <TextField
              color={this.state.passLength ? "primary" : "secondary"}
              helperText={this.state.passLength ? null : "Password must be atleast 8 characters"}
              required
              label="Password"
              defaultValue={password}
              name="password"
              className="textBox"
              margin="normal"
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 12 }}
              onChange={e => this.updateValue(e)}
            />

            <Button
              variant="contained"
              color="primary"
              className="sign-up-btn"
              type="submit"
            >
              Sign-in
            </Button>
          </Container>
        </form>
      </React.Fragment>
    );
  }
}
