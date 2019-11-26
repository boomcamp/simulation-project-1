import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Notif from "./notif";

import Header from "./header";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "150%",
    height: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(5)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  media: {
    height: "50%"
  },
  container: {
    // backgroundColor: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  links: {
    textDecoration: "none",
    color: "white",
    padding: theme.spacing(2)
  }
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      uname: "",
      email: "",
      password: "",
      confirmPass: "",

      fnameError: false,
      lnameError: false,
      unameError: false,
      emailError: false,
      passwordError: false,
      confirmPassError: false,
      error: "",
      active: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(props) {
    if (localStorage.getItem("token")) {
      this.props.history.push("/component/manageuser");
    }
  }
  handleChange = e => {
    this.setState({
      [e.name + "Error"]: e.value ? false : true,
      [e.name]: e.value
    });
  };
  // validation
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.fname &&
      this.state.lname &&
      this.state.uname &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPass
    ) {
      axios({
        method: "post",
        url: "http://localhost:4007/register",
        data: {
          email: this.state.email,
          firstName: this.state.fname,
          lastName: this.state.lname,
          username: this.state.uname,
          password: this.state.password
        }
      })
        .then(response => {
          // localStorage.setItem("token", response.data.accessToken);
          this.props.history.push("/component/login");
          // console.log(response.data.accessToken);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            notif: "warning",
            open: true
          });
        });
    } else {
      this.setState({
        fnameError: this.state.fname ? false : true,
        lnameError: this.state.lname ? false : true,
        unameError: this.state.uname ? false : true,
        emailError: this.state.email ? false : true,
        passwordError: this.state.password ? false : true,
        confirmPassError: this.state.confirmPass ? false : true
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header />
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <TextField
                value={this.state.fname}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fname"
                label={
                  this.state.fnameError ? "Required First Name" : "First Name"
                }
                name="fname"
                autoFocus
                error={this.state.fnameError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                value={this.state.lname}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={
                  this.state.lnameError ? "Required Last Name" : "Last Name"
                }
                name="lname"
                error={this.state.lnameError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                value={this.state.uname}
                helperText=""
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={this.state.unameError ? "Required username" : "username"}
                name="uname"
                error={this.state.unameError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                value={this.state.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={this.state.emailError ? "Required Email" : "Email"}
                name="email"
                error={this.state.emailError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                value={this.state.password}
                helperText=""
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={
                  this.state.passwordError ? "Required Password" : "Password"
                }
                type="password"
                error={this.state.passwordError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                value={this.state.confirmPass}
                helperText=""
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPass"
                label={
                  this.state.confirmPassError
                    ? "Required Confirm Password"
                    : "Confirm Password"
                }
                type="password"
                error={this.state.confirmPassError}
                onChange={e => this.handleChange(e.target)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>

              <Grid item>
                <Link to="/component/login" variant="body2">
                  {"Have already  an account? LogIn"}
                </Link>
              </Grid>
            </form>
          </div>
        </Container>
        <Notif
          open={this.state.open}
          handleClose={() => this.setState({ open: false })}
          notif={this.state.notif}
        />
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(SignUp);
