import React, { useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function Registration(props) {
  const classes = useStyles()
  const [err, showErr] = useState({
    userName: {
      required: false
    },
    email:{
      required: false
    },
    firstName: {
      required: false
    },
    lastName: {
      required: false
    },
    password: {
      required: false
    },
    comfirmPassword: {
      required: false
    },
    checkPass: {
      required: false
    },
    required: {
      required: false
    }
  })

  const [user, setUser] = useState({
    users: [],
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    comfirmPassword: "",
    checkPass: "",
    required: "",
  })


  React.useEffect(()=>{
    console.log(user)
  },[user])

  function requiredData(e) {
    if (e.target.value.length === 0) {
      showErr({
        ...err,
        [`${e.target.name}`]: {
        required: true 
        }
      })
    }else{
      showErr({
        ...err,
        [`${e.target.name}`]: {
          required: false
        }
      })
    }
  }

  function checkPassword(e) {
    if (e.target.value.length === 0) {
      setUser({
        ...user,
        comfirmPassword: e.target.value,
        checkPass: "Please re-enter password"
      })
    } else if (e.target.value !== user.password) {
      setUser({
        ...user,
        comfirmPassword: e.target.value,
        checkPass: "Password must match"
      })
    } else {
      setUser({ ...user, comfirmPassword: e.target.value, checkPass: "" })
    }
  }
 
  function signUp(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/register`, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        username: user.userName,  
        active: true
      })
      .then(() => alert("Successfully Registered"))
      .then(() => {
        props.history.push("/")
      }).catch(error => {
        try {
          alert(error.response.data);
        } catch{
          console.log(error);
        }
      })

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  onSubmit={(e)=>signUp(e)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onBlur={e => requiredData(e)} 
                error={err.firstName.required}
                helperText={!err.firstName.required  ? ''  : "Required to fill out"}
                value={user.firstName}
                onChange={e => {
                  setUser({ ...user, firstName: e.target.value })
                  requiredData(e)
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onBlur={e => requiredData(e)}
                error={err.lastName.required}
                helperText={!err.lastName.required ? ''  : "Required to fill out"}
                value={user.lastName}
                onChange={e => {
                  setUser({ ...user, lastName: e.target.value })
                  requiredData(e)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={e => requiredData(e)} 
                error={err.email.required}
                helperText={!err.email.required  ? ''  : "Required to fill out"}
                value={user.email}
                onChange={e => {
                  setUser({ ...user, email: e.target.value })
                  requiredData(e)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="userName"
                autoComplete="userName"
                onBlur={e => requiredData(e)} 
                error={err.userName.required}
                helperText={!err.userName.required  ? ''  : "Required to fill out"}
                value={user.userName}
                onChange={e => {
                  setUser({ ...user, userName: e.target.value })
                  requiredData(e)
                }}
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
                onBlur={e => requiredData(e)} 
                error={err.password.required}
                helperText={!err.password.required  ? ''  : "Required to fill out"}
                value={user.password}
                onChange={e => {
                  setUser({ ...user, password: e.target.value })
                  requiredData(e)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onBlur={checkPassword}
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                error={user.checkPass ? true : false}
                helperText={user.checkPass ? user.checkPass : " "}
                value={user.confirmPassword}
                onChange={checkPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
