import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export class register extends Component {
    constructor() {
        super();
        this.state = {
            email: [],
            username: [],
            firstName: [],
            lastName: [],
            password: [],
            redirectToReferrer: false
        };
        this.submitregistration = this.submitregistration.bind(this);
        this.handlechange = this.handlechange.bind(this);
    }
    handlechange(e) {
        console.log(e.value)
        e.name === 'fname' ? this.setState({ firstName: e.value }) :
        e.name === 'lname' ? this.setState({ lastName: e.value }) :
        e.name === 'email' ? this.setState({ email: e.value }) :
        e.name === 'uname' ? this.setState({ username: e.value }) :
        this.setState({ password: e.value })
    }
    submitregistration() {  
        axios.post("http://localhost:3000/register", this.state).then(result => {
                console.log("Succesfully Registered!");
                localStorage.setItem("token", result.data.accessToken);
                this.setState({ redirectToReferrer: true });
            });
    }
    render() {
        if (this.state.redirectToReferrer || localStorage.getItem(this.state)) {
            return (<Redirect to={'/login'} />)
        }
        return (
            <MDBContainer className="margin-top">
                <MDBRow>
                    <MDBCol md="6" className="offset-md-3 " >
                        <MDBCard className="shadow-box-example z-depth-2">
                            <div className="header pt-3 info-color lighten-2">
                                <MDBRow className="d-flex justify-content-center">
                                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                        Register
                                    </h3>
                                </MDBRow>
                            </div>
                            <MDBCardBody className="mx-4 mt-4">
                                <MDBInput label="Your email" name="email" group type="text" validate onChange={e => this.handlechange(e.target)} />
                                <MDBInput label="Your username" name="uname" group type="text" validate onChange={e => this.handlechange(e.target)} />
                                <MDBInput label="Your firstname" name="fname" group type="text" validate onChange={e => this.handlechange(e.target)} />
                                <MDBInput label="Your lastname" name="lname" group type="text" validate onChange={e => this.handlechange(e.target)} />
                                <MDBInput label="Your password" name="pword" group type="password" validate containerClass="mb-0" onChange={e => this.handlechange(e.target)} />
                                <MDBInput label="Confirm password" name="cpword" group type="password" validate containerClass="mb-0" onChange={e => this.handlechange(e.target)} />
                                <div className="text-center mb-4 mt-5">
                                    <MDBBtn color="info" type="button" className="btn-block z-depth-2" onClick={this.submitregistration}>
                                        Register
                                    </MDBBtn>
                                    <p className="font-small grey-text d-flex justify-content-center">
                                        Already have an account?
                                        <Link className="dark-grey-text font-weight-bold ml-1" to="/">Log in</Link>
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

export default register
