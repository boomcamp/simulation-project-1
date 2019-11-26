import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, TextField, Button, CssBaseline } from '@material-ui/core';

import axios from 'axios'
import { Link } from 'react-router-dom';

import { message } from 'antd';

import './signin.css'
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,

    },
  },
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


}));

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',

    }
  }
  componentDidMount() {

    localStorage.getItem('token') ?
      this.props.history.push('/homepage') :
      this.props.history.push('/signin')

  }
  logIn = (e) => {
    e.name === 'email' ?
      this.setState({ email: e.value }) :
      this.setState({ password: e.value })
  }

  handleClick = (e) => {
    e.preventDefault()

    axios
      .post(`http://localhost:3000/login`, this.state)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.accessToken)
        this.props.history.push('/homepage')
        message.success("Welcome " + this.state.email);
      })
      .catch(err => {
        message.error(err.response.data);

      })
  }

  render() {

    return (
      <body className='body'>
        <Container component="main" maxWidth="xs" style={{ marginTop: '200px', backgroundColor: 'whitesmoke', width: '450px', height: '50vh', borderRadius: '10px',boxShadow: "1px 3px 1px 1px #9E9E9E"}}>
          <CssBaseline />
          <div className={useStyles.paper} style={{ paddingTop: '70px' }}>
            <Typography component="h1" variant="h5" style={{ textAlign: 'center' }}>
              Sign in
        </Typography>
            <form className={useStyles.form} onSubmit={this.handleClick} autoComplete="off"  >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                onChange={(e) => this.logIn(e.target)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => this.logIn(e.target)}
              />
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
          </Button>
              <br />
              <br />

              <Grid container>
                <Grid item>
                  <Link to='/' >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </body>
    )
  }
}
