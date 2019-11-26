import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import AppBar from "../AppBar/AppBar";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#3f51b5"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "50vh",
    width: "50vh",
    marginTop: "78px"
  },
  button: {
    width: "200px",
    height: "50px",
    margin: "17px auto"
  },
  icon: {
    width: "100px",
    height: "100px",
    margin: "0 auto"
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [Token, setToken] = useState("");

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };

  function validate(e) {
    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Failed to Login",
        text: "Please complete the required information"
      });
    }
    if (email === "") {
      setemailError("This field is required");
    } else {
      if (
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          email
        )
      ) {
        setemailError("");
      } else setemailError("Invalid Email Format");
    }
    if (password === "") {
      setPasswordErr("This field is required");
    } else {
      // Login
      axios
        .post("http://localhost:3000/login", {
          email: email,
          password: password
        })
        .then(token => {
          localStorage.setItem("Token", token.data.accessToken);
          setToken(token.data.accessToken);
          axios
            .get(`http://localhost:3000/users?q=${email}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`
              }
            })
            .then(res => {
              localStorage.setItem("Name", res.data[0].firstName);
              {
                Swal.fire({
                  icon: "success",
                  title: "Logged In Successfully!"
                }).then(result => {
                  props.setRedirect(true);
                });
              }
            })
            .catch(e => {
              setPasswordErr("Email and Password did not match");
              Swal.fire({
                icon: "error",
                title: "Failed to Login"
              });
            });
        })
        .catch(e => {
          setPasswordErr("Email and Password did not match");
          Swal.fire({
            icon: "error",
            title: "Failed to Login",
            text: "Please check your email and password"
          });
        });
      // Login End
    }
  }
  return (
    <React.Fragment>
      <AppBar />
      <Container width="fixed" className={classes.container}>
        {" "}
        <AccountCircleIcon color="primary" className={classes.icon} />
        <Typography className={classes.title}>Log In</Typography>
        <Box className={classes.box}>
          <TextField
            onChange={handleEmail}
            error={emailError === "" ? false : true}
            helperText={emailError ? emailError : ""}
            id="email"
            label="Email Address *"
            type="text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={handlePassword}
            error={passwordErr === "" ? false : true}
            helperText={passwordErr ? passwordErr : ""}
            id="password"
            label="Password *"
            type="password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={validate}
          >
            <Typography style={{ color: "white" }}>Log In</Typography>
          </Button>
          <Typography style={{ marginTop: "15px" }}>
            Do you have an account?{" "}
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              Register
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
