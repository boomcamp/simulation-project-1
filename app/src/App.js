import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      username: "",
      active: true,
      token: null,
      users: []
    };
  }
  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token")
    });
  }
  handleOnChange = (text, val) => {
    val === "email"
      ? this.setState({
          email: text
        })
      : val === "password"
      ? this.setState({
          password: text
        })
      : val === "firstname"
      ? this.setState({
          firstname: text
        })
      : val === "lastname"
      ? this.setState({
          lastname: text
        })
      : this.setState({
          username: text
        });
  };
  handleLogin = () => {
    const url = "http://localhost:3000/login";
    axios
      .post(url, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("email", this.state.email);
        this.setState({
          token: res.data.accessToken
        });
      })
      .catch(() => alert("Invalid Email or Password!!!"));
  };
  handleSignUp = () => {
    const url = "http://localhost:3000/register";
    axios
      .post(url, {
        email: this.state.email,
        password: this.state.password,
        plainPassword: this.state.password,
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        lastname: this.state.active
      })
      .then(
        alert("Successfully created! Go to Login Page and Login your account!")
      )
      .catch(alert("Please fill out the required fields"));
  };
  handleLogOut = () => {
    this.setState({
      token: null
    });
    localStorage.clear();
  };
  render() {
    return (
      <HashRouter>
        <Routes
          token={this.state.token}
          handleOnChange={this.handleOnChange}
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
          handleLogOut={this.handleLogOut}
        />
      </HashRouter>
    );
  }
}
