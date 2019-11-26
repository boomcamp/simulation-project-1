import React, { Component } from "react";
import { TextField, Button, Grid, Snackbar, FormHelperText } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      snackbarState: false,
      snackbarMessage: "",
      backgroundColor: '',
      icon: ''
    };
  }
  componentDidMount() {
    let login = localStorage.getItem('notif') ? true : false
    if(login){
      this.handleOpenSnackbar("Successfully LogOut","darkgreen");
      this.setState({
        icon: 'check'
      })

        localStorage.removeItem('notif')
    }

    if (localStorage.getItem("accessToken") === null) {
  
    } else {
      this.props.history.push("/manage-user");
      
    }

    if (localStorage.getItem("newAcc")) {
      this.handleOpenSnackbar("Successfully Created","darkgreen");
      this.setState({
        icon: 'check'
      })
    }
  }
  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
    localStorage.removeItem("newAcc");
  };
  handleOpenSnackbar = (message, color) => {
    this.setState({ snackbarState: true,
       snackbarMessage: message,
       backgroundColor: color ? color : '' });

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = event => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/login`, {
        email: this.state.email,
        password: this.state.password
      })
      
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          this.handleOpenSnackbar("Successfully logged in");
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("auth", "logged in" );
          localStorage.setItem("name", this.state.email)
          
        }
        this.props.history.push("/manage-user");
        // console.log(res);
        
      })
      .catch(err => {
        console.log(err.response.data,"red");
        this.handleOpenSnackbar("Invalid Account!", "#9a0707");
        this.setState({
          icon: 'error'
        })
      });
  };

  render() {
    // console.log(this.state.email)
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Snackbar
           ContentProps={{
            style:{
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
          onSubmit={this.handleLogin}
   
          autoComplete="off"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 700,
            
            }}
          >
            <Grid
              container
             
              direction="column"
              style={{
                border: "solid 1px #eee",
                padding: 15,
                width:"20%",
                alignItems:"center"
              }}
            >
              <Grid item
               lg={10}
              md={12}
            >
              <h1>Log in</h1>
              <TextField
               variant="outlined"
              fullWidth
                label="Email"
                required
                id="standard-required"
                className={classes.textField}
                type="email"
                autoComplete="email"
                margin="normal"
                name="email"
                error={this.state.error}
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              
              <TextField
              variant="outlined"
              fullWidth
                label="Password"
                required
                id="filled-password-input"
                className={classes.textField}
                type="password"
                margin="normal"
                name="password"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
              <div style={{marginTop:20}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  fullWidth
                >
                  Sign In
                </Button>
                &emsp;
                <Link style={{ textDecoration: "none" }} to="/register">
                  <Button 
                  variant="contained" 
                  color="secondary" 
                  type="button" 
                  fullWidth>
                    Register
                  </Button>
                </Link>
              </div>
            </Grid>
            </Grid>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Login);
