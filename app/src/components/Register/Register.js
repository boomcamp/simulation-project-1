import React, { Component } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Div, Div2, Cont, Span } from "../Style/Style";

export default class Login extends Component {
  render() {
    const {
      handleOnChange,
      handleSignUp,
      confirmed,
      error,
      errMsg,
      errorEmail,
      errorEmailMsg,
      clearState
    } = this.props;

    return (
      <Div>
        <Cont>
          <Span>Sign Up</Span>
          <form onSubmit={e => handleSignUp(e)}>
            <Div2>
              <Grid container>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                    onChange={e => handleOnChange(e.target.value, "firstname")}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    onChange={e => handleOnChange(e.target.value, "lastname")}
                  />
                </Grid>
              </Grid>
              <TextField
                required
                fullWidth
                label="Username"
                onChange={e => handleOnChange(e.target.value, "username")}
              />
              <TextField
                required
                error={errorEmail}
                fullWidth
                label="Email Address"
                helperText={errorEmailMsg}
                onChange={e => handleOnChange(e.target.value, "email")}
              />
              <TextField
                required
                error={error}
                fullWidth
                label="Password"
                type="password"
                helperText={errMsg}
                onChange={e => handleOnChange(e.target.value, "password")}
              />
              <TextField
                required
                error={confirmed}
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                helperText={confirmed ? "password didn't match" : ""}
                onChange={e => handleOnChange(e.target.value)}
              />
            </Div2>
            <Button
              disabled={confirmed || errorEmail || error}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              SignUp
            </Button>
          </form>
          <Grid container justify="flex-end" className="padding">
            <Link
              to="/"
              onClick={() => clearState()}
              style={{ textDecoration: "none" }}
            >
              {"Already have an account? Sign in here"}
            </Link>
          </Grid>
        </Cont>
      </Div>
    );
  }
}
