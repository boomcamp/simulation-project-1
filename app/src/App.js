import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./routes";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: " ",
      username: "",
      password: " ",
      accessToken: "f",
      regSuccess: false
    };
  }
  handleOnChange = (val, check) => {
    check === "fname"
      ? this.setState({ firstName: val })
      : check === "lname"
      ? this.setState({ lastName: val })
      : check === "email"
      ? this.setState({ email: val })
      : check === "pass"
      ? this.setState({ password: val })
      : check === "username"
      ? this.setState({ username: val })
      : toast.error("Error!");
  };

  handleLogin = () => {
    const Obj = {
      email: this.state.email,
      password: this.state.password
    };
    this.state.email !== " " && this.state.password !== " "
      ? !this.state.email && !this.state.password
        ? toast.error("Fill all the Blanks")
        : !this.state.email
        ? toast.warn("Invalid Email")
        : !this.state.password
        ? toast.warn("Invalid Password")
        : axios
            .post("http://localhost:3000/login", Obj)
            .then(response => {
              localStorage.setItem("user", response.data.accessToken);
              this.setState({
                token: response.data.accessToken,
                accessToken: JSON.stringify(localStorage.getItem("user"))
              });
              toast(`Hello There! ${this.state.email}`);
            })
            .catch(() => toast.error("User Not Found"))
      : toast.error("Fill all the Blanks");
  };

  handleSignUp = () => {
    const Obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      active: true,
      plainPassword: this.state.password
    };
    axios
      .post("http://localhost:3000/register", Obj)
      .then(() => {
        this.setState({ regSuccess: true });
        toast.success("Account has been Successfully Added!");
      })
      .catch(() => {
        toast.error("Error in Adding Account!");
      });
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      accessToken: "",
      email: "null",
      password: "null"
    });
  };

  render() {
    return (
      <HashRouter>
        <ToastContainer />
        <Routes
          accessToken={this.state.accessToken}
          handleOnChange={this.handleOnChange}
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
          handleLogout={this.handleLogout}
          regSuccess={this.state.regSuccess}
        />
      </HashRouter>
    );
  }
}
