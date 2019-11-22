import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: [],
            password: [],
            redirectTorefferer: false
        };
        this.handlechangeInput = this.handlechangeInput.bind(this);
        this.login = this.login.bind(this);
    }
    handlechangeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    login() {
        if (this.state.email && this.state.password) {
            axios.post("http://localhost:3000/login", this.state).then(result => {
                console.log("Succesfully login!");
                localStorage.setItem("token", result.data.accessToken);
                this.setState({ redirectToReferrer: true });
            });
        }
    }
    render() {
        if (this.state.redirectToReferrer || localStorage.getItem(this.state)) {
            return (<Redirect to={'/management'} />)
        }
        return (
            <MDBContainer className="margin-top">
                <MDBRow>
                    <MDBCol md="6" className="offset-md-3">
                        <MDBCard className="shadow-box-example z-depth-2">
                            <div className="header pt-3 info-color lighten-2">
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                        Log in
                                    </h3>
                                </MDBRow>
                            </div>
                            <MDBCardBody className="mx-4 mt-4">
                                <MDBInput label="Your email" group type="text" name="email" validate onChange={this.handlechangeInput} />
                                <MDBInput label="Your password" group type="password" name="password" validate required containerClass="mb-0" onChange={this.handlechangeInput} />
                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn color="info" type="button" className="btn-block z-depth-2" onClick={this.login}>
                                        Log in
                                    </MDBBtn>
                                    <p className="font-small grey-text d-flex justify-content-center">
                                        Don't have an account?
                                        <Link className="dark-grey-text font-weight-bold ml-1" to="/register">Register</Link>
                                    </p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default login
