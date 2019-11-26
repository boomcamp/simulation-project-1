import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LinearProgress from '@material-ui/core/LinearProgress';
import Navigation from './Navigation'

export default class Register extends Component{
  constructor(){
    super();
    this.state = {
      data: { 
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: ''
      },
      confirmPassword: '',
      redirect: false,
      toggleRedir: false,
      open: false,
      validationPass: null,
    }
  }

  validatePassFn = (e) => {
    const { password } = this.state.data;
    const {confirmPassword} = this.state;
    if(confirmPassword.length > 1 || password.length > 1){
      if( e.target.value !== password && e.target.value !== confirmPassword){
        this.setState({
          ...this.state,
          validationPass: false
        })
      }else{
        this.setState({
          ...this.state,
          validationPass: true
        })
      }
    }
  }

  handleClick = () => {
    this.setState({ 
      ...this.setState,
      open: true })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ 
      ...this.setState,
      open: false })
  };
  

  register = (e) =>{
    e.preventDefault();
    axios({
      method: 'post',
      url: `http://localhost:4000/register/active=true`,
      data: this.state.data,
    })
    .then(datan => 
      this.setState({
        ...this.state,
        open: true,
        toggleRedir: true
      })
      )
    
    .catch(err=> console.log(err))
  }

  successRegister=()=>{
    if(this.state.toggleRedir === true){
      setTimeout(() => {
        this.setState({ 
          ...this.state,
          redirect: true })
      }, 3000)
    }
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  onChangeTextfield = e =>{
      this.setState({ 
        data:{
          ...this.state.data,
          [e.target.name]: e.target.value
        }
      })
  }

  onChangeConPass=(e) =>{
    this.setState({ 
      ...this.state.data, 
      confirmPassword: e.target.value
    })
  }

  render(){
   const {
      lastName, 
      username, 
      password,
      firstName,
      email,
    } = this.state.data;
    const { confirmPassword,validationPass } = this.state;

    return (
      
      <React.Fragment>
      <Navigation/>
      <form onSubmit={this.register}>
      {this.successRegister()}
      {this.renderRedirect()}
      {this.state.open ? <LinearProgress /> : null }
      <CssBaseline />
      <Container maxWidth="sm" className="register-cont" >
      
      <h1>Sign-up</h1>
        <div className="names-cont">
        
          <TextField
            required
            id="outlined-required"
            label="First name"
            defaultValue={firstName}
            className="namesTextBox"
            margin="normal"
            variant="outlined"
            name="firstName"
            onChange={(e) => this.onChangeTextfield(e)}
          />
          <TextField
            required
            id="outlined-required"
            label="Last name"
            defaultValue={lastName}
            className="namesTextBox"
            margin="normal"
            variant="outlined"
            name="lastName"
            onChange={(e) => this.onChangeTextfield(e)}
          />
        </div>
        
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue={username}
          className="textBox"
          margin="normal"
          variant="outlined"
          name="username"
          onChange={(e) => this.onChangeTextfield(e)}
        />
        <TextField
          color={validationPass ? "primary" : "secondary"}
          helperText={validationPass ? null : "Password does not match"}
          required
          id="outlined-required"
          label="Password"
          defaultValue={password}
          className="textBox"
          margin="normal"
          variant="outlined"
          type="password"
          name= "password"
          onChange={(e) => {this.validatePassFn(e); this.onChangeTextfield(e)}}
        />
        <TextField
          color={validationPass ? "primary" : "secondary"}
          helperText={validationPass ? null : "Password does not match"}
          required
          id="outlined-required"
          label="Re-type Password"
          defaultValue={confirmPassword}
          className="textBox"
          margin="normal"
          variant="outlined"
          type="password"
          name= "confirmPassword"
          onChange={(e) => {this.validatePassFn(e); this.onChangeConPass(e)}}
        />
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          defaultValue={email}
          className="textBox"
          margin="normal"
          variant="outlined"
          type="email"
          name="email"
          onChange={(e) => this.onChangeTextfield(e)}
        />
        <Button variant="contained" color="primary" className="sign-up-btn" type="submit">
          Sign-up
        </Button>
      
      </Container>


      <Snackbar
        className="snackSuccess"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id"><CheckCircleIcon/> Creating Account...</span>}
        action={[
          
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            // className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
      </form>
      </React.Fragment>

    );
  }
}