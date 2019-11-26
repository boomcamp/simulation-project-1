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
  padding: 100px;
`;

class Login extends React.Component {
  render() {
    const { handleLogin, handleOnChange, handleReg } = this.props;
    return (
      <Div>
        <form onSubmit={e => handleLogin(e)}>
          <MDBCard style={{ width: "500px" }}>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput
                required
                icon="user"
                label="Your email"
                group
                type="text"
                onChange={e => handleOnChange(e.target.value, "email")}
              />
              <MDBInput
                required
                icon="lock"
                label="Your password"
                group
                type="password"
                onChange={e => handleOnChange(e.target.value, "pass")}
              />
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="danger"
                  type="submit"
                  className="btn-block z-depth-2"
                >
                  Log in
                </MDBBtn>
              </div>
              <Link to="/register">
                <p
                  className="font-small grey-text d-flex justify-content-center"
                  onClick={handleReg}
                >
                  Don't have an account?{" "}
                  <span className="dark-grey-text font-weight-bold ml-1">
                    Sign up
                  </span>
                </p>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </form>
      </Div>
    );
  }
}

export default Login;
