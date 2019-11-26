import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Login.css";
import { MdLock, MdVpnKey, MdEmail } from "react-icons/md";

const Div = styled.div`
  color: black;
  width: 100%;
  height: 980px;
  background-color: #313641;
`;

export default class Login extends React.Component {
  render() {
    return (
      <Div>
        <div id="container-login">
          <div id="title">
            <i>
              <MdLock />
            </i>
            Login
          </div>

          <form onSubmit={e => this.props.mySubmitHandler(e)}>
            <div className="input">
              <div className="input-addon">
                <i>
                  <MdEmail />
                </i>
              </div>
              <input
                id="email"
                placeholder="Email"
                type="text"
                required
                className="validate"
                autoComplete="off"
                onChange={email =>
                  this.props.myEmailHandler(email.target.value)
                }
              />
            </div>

            <div className="clearfix"></div>

            <div className="input">
              <div className="input-addon">
                <i>
                  <MdVpnKey />
                </i>
              </div>
              <input
                id="password"
                placeholder="Password"
                type="password"
                required
                className="validate"
                autoComplete="off"
                onChange={password =>
                  this.props.myPasswordHandler(password.target.value)
                }
              />
            </div>

            <div className="remember-me">
              <input type="checkbox" />
              <span>Remember Me</span>
            </div>

            <input className="log_inn" type="submit" value="Log In" />
          </form>

          <div className="register">
            Don't have an account yet?
            <br />
            <button className="btn-register">
              <Link to="/register" onClick={() => this.props.redirectHandler()}>
                Sign up here
              </Link>
            </button>
          </div>
        </div>
      </Div>
    );
  }
}
