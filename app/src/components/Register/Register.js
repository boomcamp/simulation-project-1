import React, { Component } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Div, Cont, Span, Span2 } from "../Style/Style";

export default class Login extends Component {
  render() {
    const { handleOnChange, handleSignUp } = this.props;
    return (
      <Div>
        <Cont>
          <Span>Sign Up</Span>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={e => handleOnChange(e.target.value, "firstname")}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                onChange={e => handleOnChange(e.target.value, "lastname")}
              />
            </Grid>
          </Grid>
          <Span2>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username"
              autoComplete="username"
              id="username"
              onChange={e => handleOnChange(e.target.value, "username")}
            />
          </Span2>

          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            id="email"
            onChange={e => handleOnChange(e.target.value, "email")}
          />
          <Span2>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => handleOnChange(e.target.value, "password")}
            />
          </Span2>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleSignUp()}
          >
            SignUp
          </Button>
          <Grid container justify="flex-end" className="padding">
            <Link to="/" style={{ textDecoration: "none" }}>
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Cont>
      </Div>
    );
  }
}
