import React, {useEffect, useState} from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCpassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== password) {
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
              "email": email,
              "password": password,
              "plainPassword": password,
              "username": username,
              "firstName": fname,
              "lastName": lname,
              "active": true,
          }).then(res => {
            localStorage.setItem('token', res.data.accessToken);
            setSuccess(true)
          }).catch(err => setError(true)) 
    }

    if(success)
      return <Redirect to="/manage-users"/>
    
    return (
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                name="firstName"
                variant="outlined"
                // required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e)=>{setFname(e.target.value);}}
                validators={['required']}
                errorMessages={['This field is required']}
                value={fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                // required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>{setLname(e.target.value);}}
                validators={['required']}
                errorMessages={['This field is required']}
                value={lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                // required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmail(e.target.value); }}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'email is not valid']}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                // required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e)=>{setUsername(e.target.value); }}
                validators={['required']}
                errorMessages={['This field is required']}
                value={username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                // required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>{setPassword(e.target.value); }}
                validators={['passwordLength', 'required']}
                errorMessages={['Password Too Short', 'This field is required']}
                value={password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                // required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={(e)=>{setCpassword(e.target.value); }}
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password Mismatch', 'this field is required']}
                value={cPassword}
              />
            </Grid>
          </Grid>
          {(error) ? <p className="error">Email Already Exists</p>: null} 
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
