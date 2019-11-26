import React from "react";
import axios from "axios";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./components/Routes/Routes";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      accessToken: null,
      error: false,
      redirect: false,
      disabled: false
    };
  }

  myEmailHandler = email => {
    this.setState({ email: email });
  };

  myPasswordHandler = password => {
    this.setState({ password: password });
  };

  confirmPasswordHandler = confirmPassword => {
    if (this.state.password !== confirmPassword) {
      this.setState({
        error: true
      });
      toast.error("Password do not match!", {
        autoClose: 2000
      });
    } else {
      this.setState({
        error: false
      });
      toast.info("Password match!", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  myUsernameHandler = username => {
    this.setState({ username: username });
  };

  myFnameHandler = firstName => {
    this.setState({ firstName: firstName });
  };

  myLnameHandler = lastName => {
    this.setState({ lastName: lastName });
  };

  mySubmitHandler = e => {
    e.preventDefault();
    const url = "http://localhost:3000/login";
    axios
      .post(url, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("user", res.data.accessToken);
        this.setState({
          accessToken: localStorage.getItem("user")
        });
        toast.info("Welcome!", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() => alert("Incorrect Email/Password!!"));
  };

  redirectHandler = () => {
    this.setState({ redirect: false });
  };

  componentDidMount() {
    this.setState({ accessToken: localStorage.getItem("user") });
  }

  RegisterHandler = e => {
    e.preventDefault();
    this.setState({
      redirect: true
    });
    const url = "http://localhost:3000/register";
    axios
      .post(url, {
        email: this.state.email,
        password: this.state.password,
        plainPassword: this.state.password,
        username: this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        active: true
      })
      .then(() => {
        alert("Success!!");
      });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({ accessToken: null, email: "null", password: "null" });
  };

  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Routes
          myEmailHandler={this.myEmailHandler}
          myUsernameHandler={this.myUsernameHandler}
          myFnameHandler={this.myFnameHandler}
          myLnameHandler={this.myLnameHandler}
          myPasswordHandler={this.myPasswordHandler}
          confirmPasswordHandler={this.confirmPasswordHandler}
          mySubmitHandler={this.mySubmitHandler}
          RegisterHandler={this.RegisterHandler}
          handleLogout={this.handleLogout}
          accessToken={this.state.accessToken}
          redirect={this.state.redirect}
          redirectHandler={this.redirectHandler}
          error={this.state.error}
        />
      </HashRouter>
    );
  }
}
