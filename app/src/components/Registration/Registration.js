import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput
} from "mdbreact";
import styled from "styled-components";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  width: 100%;
`;
export default class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      tempPass: ""
    };
  }
  validationFname = val => {
    return val.length >= 1 ? true : false;
  };

  validationLname = val => {
    return val.length >= 1 ? true : false;
  };

  validationEmail = val => {
    var re = new RegExp(
      /^(([^<>()[\]\\,;:\s@"]+(\[^<>()\[\]\\,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return re.test(String(val).toLowerCase());
  };

  validationUsername = val => {
    return val.length >= 4 ? true : false;
  };

  validationPassword = val => {
    return val.length >= 5 ? true : false;
  };

  handleOnChange = val => {
    return this.props.validation.password === val
      ? this.setState({ tempPass: true })
      : this.setState({ tempPass: false });
  };

  render() {
    const { handleSignUp, handleOnChange, validation, confirm } = this.props;
    return (
      <Div>
        <MDBCard>
          <div className="header pt-3 grey lighten-2">
            <MDBRow className="d-flex justify-content-start">
              <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                Sign Up Here!
              </h3>
            </MDBRow>
          </div>
          <form onSubmit={e => handleSignUp(e)}>
            <MDBCardBody className="mx-4 mt-4">
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    className={
                      validation.firstName
                        ? this.validationFname(validation.firstName)
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                    label="First Name"
                    group
                    type="text"
                    onChange={e => handleOnChange(e.target.value, "fname")}
                    required
                  >
                    <div className="invalid-feedback">
                      Please provide a valid entry.
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </MDBInput>
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label="Last Name"
                    group
                    type="text"
                    className={
                      validation.lastName
                        ? this.validationFname(validation.lastName)
                          ? "is-valid"
                          : "is-invalid"
                        : ""
                    }
                    onChange={e => handleOnChange(e.target.value, "lname")}
                    required
                  >
                    <div className="invalid-feedback">
                      Please provide a valid entry.
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                  </MDBInput>
                </MDBCol>
              </MDBRow>

              <MDBInput
                label="Your email"
                group
                type="email"
                className={
                  validation.email
                    ? this.validationEmail(validation.email)
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }
                style={{ marginTop: "-35px" }}
                onChange={e => handleOnChange(e.target.value, "email")}
                required
              >
                <div className="invalid-feedback">
                  Please provide a valid email address.
                </div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
              <MDBInput
                label="Your Username"
                group
                type="text"
                className={
                  validation.username
                    ? this.validationUsername(validation.username)
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }
                onChange={e => handleOnChange(e.target.value, "username")}
                required
              >
                {" "}
                <div className="invalid-feedback">
                  Please provide a valid username.
                </div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
              <MDBInput
                label="Your password"
                group
                type="password"
                className={
                  validation.password
                    ? this.validationPassword(validation.password)
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }
                containerClass="mb-0"
                onChange={e => handleOnChange(e.target.value, "pass")}
                required
              >
                <div className="invalid-feedback">Password is too Short</div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
              <MDBInput
                label="Re-enter Password"
                group
                type="password"
                className={
                  confirm === "" ? "" : confirm ? "is-valid" : "is-invalid"
                }
                onChange={e => handleOnChange(e.target.value, "confirm")}
                containerClass="mb-0"
                required
              >
                <div className="invalid-feedback">Password Dont Match.</div>
                <div className="valid-feedback">Looks good!</div>
              </MDBInput>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="danger"
                  className={
                    confirm === ""
                      ? ""
                      : confirm
                      ? "btn-block z-depth-2"
                      : "btn-block z-depth-2 disabled"
                  }
                  type="submit"
                >
                  Sign Up
                </MDBBtn>
              </div>
              <Link to="/">
                <p className="font-small grey-text d-flex justify-content-center">
                  Already have an account?{" "}
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Sign In
                  </span>
                </p>
              </Link>
            </MDBCardBody>
          </form>
        </MDBCard>
      </Div>
    );
  }
}
