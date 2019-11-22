import React, { Component } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Div, Cont, Span, Span2 } from "../Style/Style";

export default class Login extends Component {
  render() {
    const { handleLogin, handleOnChange } = this.props;
    return (
      <Div>
        <Cont>
          <Span>Login</Span>
          <Span2>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              id="email"
              autoFocus
              onChange={e => handleOnChange(e.target.value, "email")}
            />
          </Span2>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={e => handleOnChange(e.target.value, "password")}
          />
          <Span2>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </Span2>
          <Grid container justify="flex-end" className="padding">
            <Link to="/register" style={{ textDecoration: "none" }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Cont>
      </Div>
    );
  }
}
