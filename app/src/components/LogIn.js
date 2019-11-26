import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Container from "@material-ui/core/Container";

import Notif from "./notif";
import Header from "./header";
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.black
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
  }
});

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      open: false,
      notif: ""
    };
  }
  componentDidMount(props) {
    console.log(this.props);
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
  handleSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:4007/login",
      data: this.state
    })
      .then(response => {
        // console.log(response);
        localStorage.setItem("token", response.data.accessToken);
        this.setState({
          notif: "success",
          open: true
        });
        this.props.history.push("/component/manageuser");
      })
      .catch(err => {
        console.log("You have a error");
        this.setState({
          notif: "warning",
          open: true
        });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header />

        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={
                  this.state.emailError
                    ? "Required Email Address"
                    : "Email Address"
                }
                name="email"
                autoComplete="email"
                autoFocus
                error={this.state.emailError}
                onChange={e => this.handleChange(e.target)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                error={this.state.passwordError}
                label={
                  this.state.passwordError ? "Required Password" : "Password"
                }
                type="password"
                autoComplete="current-password"
                onChange={e => this.handleChange(e.target)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item></Grid>
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
export default withStyles(useStyles)(LogIn);
