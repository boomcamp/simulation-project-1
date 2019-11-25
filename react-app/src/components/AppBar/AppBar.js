import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#12627c" }}>
        <Toolbar className={classes.toolbar}>
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Login</Button>
          </NavLink>
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Register</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
