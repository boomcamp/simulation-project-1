import React, { Component } from "react";
import "./App.css";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ManageUser from "./components/ManageUser";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#282c34",

    height: "100vh"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Container className={classes.container}>
          <Route path="/component/signup" component={SignUp} />
          <Route path="/component/login" component={LogIn} />
          <Route path="/component/manageuser" component={ManageUser} />
        </Container>
      </Router>
    );
  }
}
export default withStyles(useStyles)(App);
