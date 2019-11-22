import React, { useState } from "react"
import axios from "axios"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
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

export default function Registration() {
  const classes = useStyles()
  const [user, setUser] = useState({
    users: [],
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    plainPassword: "",
    comfirmPassword: "",
    checkPass: "",
  })

  function requiredData(e) {
    if (e.target.value.length === 0) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
        required: "Please fill out"
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
    } else if (e.target.value !== user.plainPassword) {
      setUser({
        ...user,
        comfirmPassword: e.target.value,
        checkPass: "Password must match"
      })
    } else {
      setUser({ ...user, comfirmPassword: e.target.value, checkPass: "" })
    }
  }
  // function handleCheckPass(e) {
  //   console.log(e.target.value);
  //   setUser({...user, plainPassword: e.target.value})
  // }
  // function signUp(){
  //   axios
  //   .post(`http://localhost:4000/user`, {
  //   email: user.email,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   plainPassword: user.plainPassword,
  //   userName: user.userName,
  //   password: user.password,
  //   active: true,
  //   }).then(res =>
  //     console.log(res)
  //     // setUser({
  //     // users: [...user, users.res.data]
  //   // })
  //   )
  // }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
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
                value={user.firstName}
                onChange={e => setUser({ ...user, firstName: e.target.value })}
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
                value={user.lastName}
                onChange={e => setUser({ ...user, lastName: e.target.value })}
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
                autoComplete="email"
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="userName"
                value={user.userName}
                onChange={e => setUser({ ...user, userName: e.target.value })}
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
                value={user.plainPassword}
                onChange={e => setUser({ ...user, plainPassword: e.target.value })}
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
            // onClick={signUp}
            disabled={
              (user.checkPass ? true : false) ||
              !user.userName ||
              !user.email ||
              !user.firstName ||
              !user.lastName ||
              !user.plainPassword ||
              !user.confirmPassword
             }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
