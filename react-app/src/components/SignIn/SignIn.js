import React, { useState } from "react";
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

export default function SignIn() {
  const classes = useStyles();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  function validate(e) {
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
    password === ""
      ? setPasswordErr("This field is required")
      : setPasswordErr("");

    // var token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx5emFAYm9vb20uY2FtcCIsImlhdCI6MTU3NDQwMzIzNiwiZXhwIjoxNTc0NDA2ODM2LCJzdWIiOiI1NiJ9.5kM0ukebtcFsQAWfueZb54UDpitXdFWaVaHCET2TFiI";
    // axios({
    //   method: "get",
    //   url: `http://localhost:3000/users`,
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then(data => {
    //   // setState({
    //   //   data: data.data
    //   // });
    //   console.log(data);
    // });
  }
  return (
    <React.Fragment>
      <Container width="fixed" className={classes.container}>
        {" "}
        <AccountCircleIcon color="primary" className={classes.icon} />
        <Typography className={classes.title}>Sign In</Typography>
        <Box className={classes.box}>
          <TextField
            onChange={e => setemail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
            Sign In
          </Button>
          <Typography style={{ marginTop: "15px" }}>
            Do you have an account?{" "}
            <NavLink to="/register">
              <Link style={{ fontSize: "17px" }}>Register.</Link>
            </NavLink>
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
