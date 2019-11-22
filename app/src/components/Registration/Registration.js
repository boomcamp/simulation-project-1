import React from "react";
import { Link } from "react-router-dom";
import { MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBInput } from "mdbreact";
import styled from "styled-components";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Input = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export default class Registration extends React.Component {
  render() {
    const { handleSignUp, handleOnChange } = this.props;
    return (
      <Div>
        <MDBCard style={{ marginTop: "180px", width: "800px" }}>
          <div className="header pt-3 grey lighten-2">
            <MDBRow className="d-flex justify-content-start">
              <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                Sign Up Here!
              </h3>
            </MDBRow>
          </div>
          <MDBCardBody className="mx-4 mt-4">
            <Input>
              <MDBInput
                icon="user"
                label="First Name"
                group
                type="text"
                style={{ width: "350px", marginBottom: "-100px" }}
                onChange={e => handleOnChange(e.target.value, "fname")}
              />
              <MDBInput
                icon="user"
                label="Last Name"
                group
                type="text"
                style={{ width: "275px" }}
                onChange={e => handleOnChange(e.target.value, "lname")}
              />
            </Input>
            <MDBInput
              icon="user"
              label="Your email"
              group
              type="text"
              style={{ marginTop: "-35px" }}
              onChange={e => handleOnChange(e.target.value, "email")}
            />
            <MDBInput
              icon="user"
              label="Your Username"
              group
              type="text"
              onChange={e => handleOnChange(e.target.value, "username")}
            />
            <MDBInput
              icon="lock"
              label="Your password"
              group
              type="password"
              containerClass="mb-0"
              onChange={e => handleOnChange(e.target.value, "pass")}
            />
            <MDBInput
              icon="lock"
              label="Re-enter Password"
              group
              type="password"
              containerClass="mb-0"
            />
            <div className="text-center mb-4 mt-5">
              <MDBBtn
                color="danger"
                type="button"
                className="btn-block z-depth-2 "
                onClick={() => handleSignUp()}
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
        </MDBCard>
      </Div>
    );
  }
}
