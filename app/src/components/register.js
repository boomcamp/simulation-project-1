import React, { Component } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
constructor(props){
  super(props);
  this.state={
    email:"",
    username:"",
    fname:"",
    lname:"",
    password:"",
    passwordconfirmation:"",

  }
}
handleSubmit =(event)=>{
  console.log("nice");
  event.preventDefault();
}
handleChange=(event)=>{
  this.setState({
    [event.target.name]: event.target.value
  })
}
  
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 700,
            border:"solid 1px"
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
            onSubmit={this.handleSubmit}
          >
            <TextField
              required
              id="standard-required"
              label="Email"
              className={classes.textField}
              margin="normal"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} required
            />
            <TextField
              required
              id="standard-required"
              label="Username"
              className={classes.textField}
              margin="normal"
              name="username"
              value={this.state.username}
              onChange={this.handleChange} required
            />
             <TextField
              required
              id="standard-required"
              label="FirstName"
              className={classes.textField}
              margin="normal"
              name="fname"
              value={this.state.fname}
              onChange={this.handleChange} required
            />
            <TextField
              required
              id="standard-required"
              label="LastName"
              className={classes.textField}
              margin="normal"
              name="lname"
              value={this.state.lname}
              onChange={this.handleChange} required
            />
            <TextField
          id="filled-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="filled"
          name="password"
          value={this.state.password}
          onChange={this.handleChange} required
        />
        <TextField
        id="filled-password-input"
        label="Confirm Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="filled"
        name="passwordconfirmation"
        value={this.state.passwordconfirmation}
        onChange={this.handleChange} required
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      
      >
        Submit
      </Button>
          </Grid>
        </div>
      </form>
    );
  }
}
export default withStyles(useStyles)(Register);
