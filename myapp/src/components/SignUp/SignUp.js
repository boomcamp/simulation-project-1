import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, CssBaseline, TextField, Button, Grid } from '@material-ui/core';

import axios from 'axios'
import { message } from 'antd';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      textAlign: 'center'
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      confirmPassword: '',
      active: false,

    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {

    console.log(e.name)
    e.name === 'fname' ?
      this.setState({ firstName: e.value }) :
      e.name === 'lname' ?
        this.setState({ lastName: e.value }) :
        e.name === 'email' ?
          this.setState({ email: e.value }) :
          e.name === 'uname' ?
            this.setState({ username: e.value }) :
            e.name === 'password' ?
              this.setState({ password: e.value }) :
              this.setState({ confirmPassword: e.value })
    this.setState({ active: true })

  }
  componentDidMount() {

    localStorage.getItem('token') ?
      this.props.history.push('/homepage') :
      this.props.history.push('/')
  }

  handleClick(e) {
    e.preventDefault()
    if (this.state.confirmPassword == this.state.password) {
      axios
        .post('http://localhost:3000/register', this.state)
        .then(res => localStorage.setItem("token", res.data.accessToken))
      this.props.history.push('/signin')
      message.success('Signup successfully')
    }
    else {
      message.warning("Password and Confirm Password didn't match")
    }
  }

  render() {
    // console.log(this.state)
    // if (this.state.redirectTologin || localStorage.getItem(this.state)) {
    //   return (<Redirect to={'/signin'} />)
    // }

    return (
      <div >
        <Container component="main" maxWidth="xs" style={{ marginTop: '200px', backgroundColor: 'whitesmoke', width: '450px', height: '80vh', borderRadius: '10px', boxShadow: "1px 3px 1px 1px #9E9E9E" }}>


          <div className={useStyles.paper}>


            <form className={useStyles.form} autoComplete="off" onSubmit={(e) => this.handleClick(e)} style={{ paddingTop: '100px' }}>
              <Typography component="h2" variant="h5" style={{ textAlign: 'center', }}>
                Sign up
           </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lname"
                    autoComplete="lname"
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="uname"
                    autoComplete="email"
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type='email'
                    autoComplete="email"
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => this.handleChange(e.target)}
                  />
                </Grid>

              </Grid>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={useStyles.submit}
              >
                Sign Up
          </Button>
              <br />
              <br />
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to='/signin' style={{ cursor: 'pointer' }}>
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </form>
          </div>

        </Container>
      </div>
    )
  }
}
