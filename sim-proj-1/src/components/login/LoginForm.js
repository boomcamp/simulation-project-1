import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

export default function LoginForm() {
    const classes = useStyles();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleSubmit = () => {
      axios.post('http://localhost:3000/login', {
              "email": email,
              "password": password,
          }).then(res => {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('user', email);
            setSuccess(true)
          }).catch(err =>  setError(true)) 
    }

    if(success)
      return <Redirect to="/manage-users" />

    return (
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>{setEmail(e.target.value);}}
            validators={['required']}
            errorMessages={['This field is required']}
            value={email}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e)=>{setPassword(e.target.value);}}
            validators={['required']}
            errorMessages={['This field is required']}
            value={password}
          />
          {(error) ? <p className="error">Incorrect Email/Password</p>: null} 
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
