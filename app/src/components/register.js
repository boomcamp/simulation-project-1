import React, { Component } from "react";
import { TextField, Grid, Button, Snackbar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import Icon from "@material-ui/core/Icon";


const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      fname: "",
      lname: "",
      password: "",
      passwordconfirmation: "",
      snackbarState: false,
      snackbarMessage: "",
      backgroundColor: "",
      icon: ''
    };
  }
  componentDidMount() {
    if (localStorage.getItem("accessToken") === null) {
    } else {
      this.props.history.push("/manage-user");
    }
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({
      snackbarState: true,
      snackbarMessage: message,
      backgroundColor: color ? color : ""
    });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.password == this.state.passwordconfirmation) {
      axios
        .post("http://localhost:3000/register", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          firstName: this.state.fname,
          lastName: this.state.lname,
          active: true
        })
        .then(result => {
          // console.log(result.data);
          this.handleOpenSnackbar("Successfully registered", "darkgrzeen");
          localStorage.setItem("newAcc", true);
          this.props.history.push("/");
          this.setState({
            icon: 'check'
          })
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data) {
              this.handleOpenSnackbar(error.response.data, "#9a0707");
              this.setState({
                icon: 'error'
              })
            }
          }
        });
    } else {
      this.handleOpenSnackbar("Invalid password confirmation", "#9a0707");
      this.setState({
        icon: 'error'
      })
    }
  };

  setFields = event => {
    var fieldname = event.target.name;
    var fieldError = fieldname + "Error";
    var value = event.target.value;
    this.setState({
      [fieldname]: value,
      [fieldError]: value ? false : true
    });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state);
    return (
      <React.Fragment>
        <Snackbar
          ContentProps={{
            style: {
              backgroundColor: this.state.backgroundColor
            }
          }}
          open={this.state.snackbarState}
          message={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon style={{ marginRight: 5 }} >{this.state.icon}</Icon>
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
        />

        <form
          className={classes.container}
          onSubmit={e => {
            this.handleSubmit(e);
          }}
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 700
            }}
          >
            <Grid
              container
              lg={3}
              md={12}
              direction="column"
              style={{
                border: "solid 1px #eee",
                padding: 15
              }}
            >
              <h1>Registration</h1>
              <TextField
                required
                id="standard-required"
                label={this.state.emailError ? "Required Email" : "Email"}
                error={this.state.emailError}
                className={classes.textField}
                margin="normal"
                type="email"
                name="email"
                value={this.state.email}
                onChange={e => {
                  this.setFields(e);
                }}
                required
              />
              <TextField
                label={
                  this.state.usernameError ? "Required Username" : "Username"
                }
                error={this.state.usernameError}
                required
                id="standard-required"
                className={classes.textField}
                margin="normal"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                required
                onChange={e => {
                  this.setFields(e);
                }}
                required
              />
              <TextField
                label={
                  this.state.fnameError ? "Required FirstName" : "FirstName"
                }
                error={this.state.fnameError}
                required
                id="standard-required"
                className={classes.textField}
                margin="normal"
                name="fname"
                value={this.state.fname}
                onChange={e => {
                  this.setFields(e);
                }}
                required
              />
              <TextField
                label={this.state.lnameError ? "Required LastName" : "Lastname"}
                error={this.state.lnameError}
                required
                id="standard-required"
                className={classes.textField}
                margin="normal"
                name="lname"
                value={this.state.lname}
                onChange={e => this.setFields(e)}
                required
              />
              <TextField
                label={
                  this.state.passwordError ? "Required Password" : "Password"
                }
                error={this.state.passwordError}
                required
                id="filled-password-input"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                name="password"
                value={this.state.password}
                onChange={e => this.setFields(e)}
                required
              />
              <TextField
                label={
                  this.state.passwordconfirmationError
                    ? "Required Confirm-Password"
                    : "Confirm Password"
                }
                error={this.state.passwordconfirmationError}
                equired
                id="filled-password-input"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
                name="passwordconfirmation"
                value={this.state.passwordconfirmation}
                onChange={e => this.setFields(e)}
                required
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Register
              </Button>
              <Link style={{ textDecoration: "none" }} to={`/`}>
                <p>Already have an account</p>
                {/* <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    marginTop: "2%",
                    width: "100% "
                  }}
                >
                  Sign In
                </Button> */}
              </Link>
            </Grid>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(Register);
