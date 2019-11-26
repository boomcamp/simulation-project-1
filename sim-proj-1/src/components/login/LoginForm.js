import React, {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { withSnackbar } from 'notistack';

import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function LoginForm({newUser, enqueueSnackbar, closeSnackbar}) {
    const classes = useStyles();

    const [user, setUser] = useState({ email: "", pass: ""})
    const [status, setStatus] = useState({ error: false, success: false})
    const [showPassword, setShowpassword] = useState(false)

    const action = useCallback((key) => (
      <Button onClick={() => {closeSnackbar(key) }} style={{display:`flex`}}>OK, GOT IT </Button>
    ), [closeSnackbar]);

    useEffect(() => {                      
      if (newUser) enqueueSnackbar('You have Successfully Signed up! You may now Login.', {variant: 'success', action, persist: true,})
    }, [newUser, enqueueSnackbar, action])

    const handleSubmit = () => {
      axios.post('http://localhost:3000/login', {
              "email": user.email,
              "password": user.pass,
          }).then(res => {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('user', user.email);
            setStatus({...status, success: true})
          }).catch(err =>  setStatus({...status, error: true})) 
    }

    if(status.success)
      return <Redirect to="/manage-users" />

    return (
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email" name="email" autoComplete="email"
            label="Email Address"
            autoFocus
            onChange={(e)=>{ setUser({ ...user, email: e.target.value}) }}
            validators={['required']}
            errorMessages={['This field is required']}
            value={user.email}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password" id="password"
            label="Password"
            onChange={(e)=>{ setUser({ ...user, pass: e.target.value}) }}
            validators={['required']}
            errorMessages={['This field is required']}
            value={user.pass}
            type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowpassword(!showPassword) }
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                    ),
                }}
          />
          {(status.error) ? <p className="error">Incorrect Email/Password</p>: null} 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
    )
}

export default withSnackbar(LoginForm)