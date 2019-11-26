import React, {useEffect, useState} from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignupForm() {
    const classes = useStyles();

    const [user, setUser] = useState({fname: "", lname: "", email: "", username: "", password: "", cPassword: ""})
    const [status, setStatus] = useState({ error: false, success: false})
    const [showPassword, setShowpassword] = useState({ signPass: false, cPass:false});
    
    useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== user.password) {
            return false;
        }
        return true;
      });
      ValidatorForm.addValidationRule('passwordLength', (value) => {
        if (value.length < 5) {
            return false;
        }
        return true;
      });
    })
  
    const handleSubmit = () => {                
        axios.post('http://localhost:3000/register', {
              "email": user.email,
              "password": user.password,
              "plainPassword": user.password,
              "username": user.username,
              "firstName": user.fname,
              "lastName": user.lname,
              "active": true,
          }).then(res => {
            setStatus({...status, success: true})
          }).catch(err => setStatus({ ...status, error: true} )) 
    }

    if(status.success)
      return <Redirect to={{pathname: '/', state:'newUser' }} />
    
    return (
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="First Name"
                autoFocus
                onChange={(e)=>{ setUser({...user, fname: e.target.value}) }}
                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                errorMessages={['This field is required', 'Value must be Alphabets']}
                value={user.fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="Last Name"
                autoComplete="lname"
                onChange={(e)=>{ setUser({...user, lname: e.target.value}) }}
                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                errorMessages={['This field is required', 'Value must be Alphabets']}
                value={user.lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="Email Address"
                autoComplete="email"
                onChange={(e)=>{ setUser({...user, email: e.target.value}) }}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
                value={user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="Username"
                autoComplete="username"
                onChange={(e)=>{ setUser({...user, username: e.target.value}) }}
                validators={['required']}
                errorMessages={['This field is required']}
                value={user.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="Password"
                onChange={(e)=>{ setUser({...user, password: e.target.value}) }}
                validators={['passwordLength', 'required']}
                errorMessages={['Password Too Short', 'This field is required']}
                value={user.password}
                type={showPassword.signPass ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowpassword({ ...showPassword, signPass: !showPassword.signPass }) }
                      >
                        {showPassword.signPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                label="Confirm Password"
                onChange={(e)=>{ setUser({...user, cPassword: e.target.value}) }}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password Mismatch', 'This field is required']}
                value={user.cPassword}
                type={showPassword.cPass ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowpassword({ ...showPassword, cPass: !showPassword.cPass }) }
                      >
                        {showPassword.cPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    ),
                }}
              />
            </Grid>
          </Grid>
          {(status.error) ? <p className="error">Email Already Exists</p>: null} 
          <Button
            type="submit"
            fullWidth 
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
    )
}
