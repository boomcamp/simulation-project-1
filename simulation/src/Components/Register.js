import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Register() {
  const classes = useStyles();
  const [redirect, setRedirect] =useState(false); 
  const [caution, setCaution] =useState('');
  const [toggl, settoggl] = useState(false);
  const [ body ,setBody] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: ""    
  });

 

  const submitUserData = e =>{
  e.preventDefault()
  axios({
    method: 'post',
    url: 'http://localhost:4000/register/active=true',
    data: body,
  })
  .then( response =>  {
    setRedirect(true)
  })
  .catch(err=>console.log(err))

  

  }

  const handleInputs = e =>{
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })   
    console.log(body)
  }



  const confirmpass = (e) =>{
    if(e.target.value !== body.password){
      setCaution('Password not Match')
      setRedirect(false)
      settoggl(true)
    }   
    else{
      setCaution('')
      settoggl(false)
    }
  }

  const renderRedirect = () => {
    if(redirect) {
      return <Redirect push to="/" />;
    }
  }




  return (

  
    <Container component="main" maxWidth="xs">
      {renderRedirect()}
      <CssBaseline />
      <div className={classes.paper}>
       
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={submitUserData}>
          <TextField
            variant="outlined"
            type="email"
            margin="normal"
            onChange = {handleInputs}
            id="email"
            label="Email Address"
            defaultValue={body.email}
            name="email"
            autoComplete="email"
            autoFocus
            fullWidth
            required
          />

         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            defaultValue={body.username}
            name="username"
            onChange = {handleInputs}
            autoComplete=""
          
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            defaultValue={body.firstName}
            name="firstName"
            onChange = {handleInputs}
            autoComplete=""
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            defaultValue={body.lastName}
            name="lastName"
            onChange ={handleInputs}
            autoComplete=""
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            defaultValue={body.password}
            type="password"
            id="password"
            onChange = {handleInputs}
            autoComplete="current-password"
            required
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Confirm Password"
            defaultValue={body.password}
            type="password"
            id="confirmpassword"
            onChange = {confirmpass}
            autoComplete="current-password"
            helperText={caution}
            required
            error = {toggl}
          />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>

            
   
        </form>
      </div>
    </Container>

  );
}