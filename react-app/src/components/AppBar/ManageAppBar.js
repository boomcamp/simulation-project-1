import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

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

  const logout = e => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        Swal.fire("Logged out successfully!").then(function() {
          localStorage.clear();
          window.location.href = "/login";
        });
      } else {
        window.location.href = "/manage";
      }
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#12627c" }}>
        <Toolbar className={classes.toolbar}>
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
