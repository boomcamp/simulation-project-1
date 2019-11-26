import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import AppBar from "../AppBar/AppBar";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  textField1: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
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
    marginTop: "190px"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#3f51b5"
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    width: "200px",
    height: "50px",
    margin: "20px auto"
  },
  icon: {
    width: "100px",
    height: "100px",
    margin: "0 auto"
  }
}));

export default function Register(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [ErrorUsername, setErrorUsername] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorFirstname, setErrorFirstname] = useState("");
  const [ErrorLastname, setErrorLastname] = useState("");
  const [ErrorPass, setErrorPass] = useState("");
  const [ErrorConfirmPass, setErrorConfirmPass] = useState("");
  const [token, setNewToken] = useState("");

  const handleFirstname = e => {
    setFirstname(e.target.value);
  };

  const handleLastname = e => {
    setLastname(e.target.value);
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleConfirmPass = e => {
    setConfirmPass(e.target.value);
  };

  const signUp = e => {
    firstname === ""
      ? setErrorFirstname("This field is required")
      : setErrorFirstname("");
    lastname === ""
      ? setErrorLastname("This field is required")
      : setErrorLastname("");
    username === ""
      ? setErrorUsername("This field is required")
      : setErrorUsername("");

    if (email === "") {
      setErrorEmail("This field is required");
    } else {
      if (
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          email
        )
      ) {
        setErrorEmail("");
      } else setErrorEmail("Invalid Email Format");
    }
    if (password === "") {
      setErrorPass("This field is required.");
    } else {
      if (password.length < 8) {
        setErrorPass("Please enter at least 8 characters");
      } else {
        setErrorPass("");
      }
    }

    if (confirmPass === "") {
      setErrorConfirmPass("This field is required");
    } else {
      if (confirmPass === password && password.length >= 8) {
        axios
          .post("http://localhost:3000/register", {
            firstName: firstname,
            lastName: lastname,
            email: email,
            username: username,
            password: password,
            active: true
          })
          .then(token => {
            localStorage.setItem("newToken", token.data.accessToken);
            setNewToken(token.data.accessToken);
            axios
              .get(`http://localhost:3000/users?q=${email}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("newToken")}`
                }
              })
              .then(res => {
                localStorage.setItem("Name", res.data[0].firstName);
                {
                  Swal.fire({
                    title: "Signed Up Successfully",
                    text: "Please Login to your account",
                    icon: "success"
                  });
                }
                props.history.push("/login");
              })
              .catch(e => {
                console.log(e);
                Swal.fire({
                  title: "Failed to Signup!",
                  icon: "success"
                });
              });
          })
          .catch(e => {
            Swal.fire({
              title: "Failed to Signup! Please try again",
              icon: "success"
            });
          });
      } else {
        setErrorConfirmPass("Confirm your password");
      }
    }
  };
  return (
    <React.Fragment>
      <AppBar />
      <Container maxWidth="fixed" className={classes.container}>
        {" "}
        <AccountCircleIcon color="primary" className={classes.icon} />
        <Typography className={classes.title}>Register</Typography>
        <Box className={classes.box}>
          <TextField
            error={ErrorFirstname === "" ? false : true}
            helperText={ErrorFirstname ? ErrorFirstname : ""}
            onChange={handleFirstname}
            id="FirstName"
            label="Firstname *"
            type="text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={ErrorLastname === "" ? false : true}
            helperText={ErrorLastname ? ErrorLastname : ""}
            onChange={handleLastname}
            id="LastName"
            label="Lastname *"
            type="text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={ErrorEmail === "" ? false : true}
            helperText={ErrorEmail ? ErrorEmail : ""}
            onChange={handleEmail}
            id="email"
            label="Email Address *"
            type="text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={handleUsername}
            error={ErrorUsername === "" ? false : true}
            helperText={ErrorUsername ? ErrorUsername : ""}
            id="username"
            label="Username *"
            type="text"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={handlePassword}
            error={ErrorPass === "" ? false : true}
            helperText={ErrorPass ? ErrorPass : ""}
            id="password"
            label="Password *"
            type="password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={handleConfirmPass}
            error={ErrorConfirmPass === "" ? false : true}
            helperText={ErrorConfirmPass ? ErrorConfirmPass : ""}
            id="ConfimPassword"
            label="Confirm Password *"
            type="password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ margin: "10px auto" }}
            onClick={signUp}
          >
            Register
          </Button>
          <Typography style={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <NavLink to="/login">
              <Link style={{ fontSize: "17px" }}>Log In.</Link>
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
