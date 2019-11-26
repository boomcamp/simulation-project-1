import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Registration.css";
import { MdLock, MdFace, MdVpnKey, MdEmail } from "react-icons/md";

const Div = styled.div`
  color: black;
  width: 100%;
  height: 980px;
  background-color: #313641;
`;

export default class Registration extends React.Component {
  render() {
    const { error } = this.props;
    return (
      <Div>
        <div id="container-register">
          <div id="title">
            <i>
              <MdLock />
            </i>{" "}
            Register
          </div>

          <form onSubmit={e => this.props.RegisterHandler(e)}>
            <div className="input">
              <div className="input-addon">
                <i>
                  <MdEmail />
                </i>
              </div>
              <input
                id="email"
                placeholder="Email"
                type="email"
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
                  <MdFace />
                </i>
              </div>
              <input
                id="username"
                placeholder="Username"
                type="text"
                required
                className="validate"
                autoComplete="off"
                onChange={username =>
                  this.props.myUsernameHandler(username.target.value)
                }
              />
            </div>

            <div className="input">
              <div className="input-addon">
                <i>
                  <MdFace />
                </i>
              </div>
              <input
                id="firstName"
                placeholder="First Name"
                type="text"
                required
                className="validate"
                autoComplete="off"
                onChange={firstName =>
                  this.props.myFnameHandler(firstName.target.value)
                }
              />
            </div>

            <div className="input">
              <div className="input-addon">
                <i>
                  <MdFace />
                </i>
              </div>
              <input
                id="lastName"
                placeholder="Last Name"
                type="text"
                required
                className="validate"
                autoComplete="off"
                onChange={lastName =>
                  this.props.myLnameHandler(lastName.target.value)
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

            <div className="input">
              <div className="input-addon">
                <i>
                  <MdVpnKey />
                </i>
              </div>
              <input
                id="password1"
                placeholder="Re-enter Password"
                type="password"
                required
                className="validate"
                autoComplete="off"
                onChange={confirmPassword =>
                  this.props.confirmPasswordHandler(
                    confirmPassword.target.value
                  )
                }
              />
            </div>

            <button className="submit" type="submit" disabled={error}>
              Register
            </button>
          </form>

          <div className="register">
            Do you already have an account?
            <button className="btn-log-in">
              <Link to="/">Log In here</Link>
            </button>
          </div>
        </div>
      </Div>
    );
  }
}
