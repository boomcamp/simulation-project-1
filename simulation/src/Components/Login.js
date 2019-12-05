import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {  Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [caution, setCaution] =useState('');
  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: ''
  })
  const [redirect, setRedirect] =useState(false); 

  const loginFN  = (e) => {
    e.preventDefault()
    axios({
    method: 'post',
    url: 'http://localhost:4000/login',
    data: dataLogin,
    })
    .then( response =>  {
      localStorage.setItem('token', response.data.accessToken);
      setRedirect(true)
   
    })
    .catch(err=>{
      setCaution('Invalid UserName or Password')
    })

  }


  const handleLogin = e =>{
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value
    }) 
  }

  const renderRedirect = () => {
    if(redirect) {
      return <Redirect push to="/manage" />;
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {renderRedirect()}
      <CssBaseline />
      <div className={classes.paper}>
       
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form}>
          
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete=""
            required
            onChange = {handleLogin}
          />

          <TextField  
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={caution}
            required
            onChange = {handleLogin}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {loginFN}
          >
            Log in
          </Button>

          <Grid container>
            <Grid item>
              <Link to='/register' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        
      </Box>
    </Container>
  );
}