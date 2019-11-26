import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
const useStyles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  links: {
    textDecoration: "none",
    color: "white",
    padding: theme.spacing(2)
  },
  button: {
    color: "white"
  }
});
class Header extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    localStorage.clear();
    // this.props.history.push("/component/login");
    this.props.logout();
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            {localStorage.getItem("token") ? (
              <Button
                className={classes.button}
                onClick={() => {
                  this.logout();
                }}
              >
                logout
              </Button>
            ) : (
              <React.Fragment>
                <Link to="/component/LogIn" className={classes.links}>
                  Login
                </Link>
                <Link to="/component/SignUp" className={classes.links}>
                  SignUp
                </Link>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(useStyles)(Header);
