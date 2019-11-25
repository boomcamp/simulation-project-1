import React, { Component } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Div, Cont, Span, Div2 } from "../Style/Style";

export default class Login extends Component {
  render() {
    const { handleLogin, handleOnChange, handleRedirect } = this.props;
    return (
      <Div>
        <Cont>
          <Span>Login</Span>
          <form onSubmit={() => handleLogin()}>
            <Div2>
              <TextField
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                id="email"
                autoFocus
                onChange={e => handleOnChange(e.target.value, "email")}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                onChange={e => handleOnChange(e.target.value, "password")}
              />
            </Div2>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
          <Grid container justify="flex-end" className="padding">
            <Link
              to="/register"
              onClick={() => handleRedirect()}
              style={{ textDecoration: "none" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Cont>
      </Div>
    );
  }
}
