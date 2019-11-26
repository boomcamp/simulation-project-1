import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      users: [],
      confirmed: false,
      redirect: false,
      error: false,
      errMsg: "",
      errorEmail: false,
      errorEmailMsg: ""
    };
  }
  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token")
    });
  }
  handleOnChange = (text, val) => {
    if (val === "email") {
      this.setState({
        email: text
      });
      var re = /^(([^<>()[\]\\,;:\s@"]+(\[^<>()\[\]\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      re.test(text.toLowerCase())
        ? this.setState({ errorEmail: false, errorEmailMsg: "" })
        : this.setState({
            errorEmail: true,
            errorEmailMsg: "Should be a valid Email"
          });
    } else if (val === "password") {
      this.setState({
        password: text
      });
      const a = text.match(/[A-Z]/g);
      const b = text.match(/[0-9]/g);
      !a
        ? this.setState({
            error: true,
            errMsg: "Password should have atleast an uppercase letter"
          })
        : !b
        ? this.setState({
            error: true,
            errMsg: "Password should have atleast a number"
          })
        : text.length < 8
        ? this.setState({
            error: true,
            errMsg: "Password is too short"
          })
        : this.setState({
            error: false,
            errMsg: ""
          });
    } else if (val === "firstname") {
      this.setState({
        firstname: text
      });
    } else if (val === "lastname") {
      this.setState({
        lastname: text
      });
    } else if (val === "username") {
      this.setState({
        username: text
      });
    } else if (this.state.password === text && this.state.password !== "") {
      this.setState({ confirmed: false });
    } else {
      this.setState({ confirmed: true });
    }
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
        toast.info("Welcome!😁", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() => toast.error("User not found!😢"));
  };
  handleSignUp = () => {
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
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        active: this.state.active
      })
      .then(() => {
        toast.success("Account successfully created!😁", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() =>
        toast.error("Something went wrong.😢", {
          position: toast.POSITION.TOP_CENTER
        })
      );
  };
  handleLogOut = () => {
    this.setState({
      token: null
    });
    localStorage.clear();
    toast.info("Bye bye! 👋😢", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleRedirect = () => {
    this.setState({
      redirect: false
    });
  };
  render() {
    return (
      <HashRouter>
        <ToastContainer autoClose={3000} />
        <Routes
          token={this.state.token}
          handleOnChange={this.handleOnChange}
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
          handleLogOut={this.handleLogOut}
          confirmed={this.state.confirmed}
          handleConfirmPassword={this.handleConfirmPassword}
          redirect={this.state.redirect}
          handleRedirect={this.handleRedirect}
          errMsg={this.state.errMsg}
          error={this.state.error}
          errorEmail={this.state.errorEmail}
          errorEmailMsg={this.state.errorEmailMsg}
        />
      </HashRouter>
    );
  }
}
