import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol, MDBContainer, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
export class management extends Component {
    constructor() {
        super()
        this.state = {
            redirectToReferrer: false,
        }
        this.logout = this.logout.bind(this);
    }
    logout() {
        localStorage.setItem(this.state, '');
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'}/>)
          }
        return (
            <div>
                <MDBContainer>
                    <MDBRow className="table-margin-top">
                        <MDBCol md="3"></MDBCol>
                        <MDBCol md="3" className="margin-top-filter">
                            <input className="form-control shadow-box-example z-depth-1" type="text" placeholder="Search" aria-label="Search" />
                        </MDBCol>
                        <MDBCol md="3" className="margin-top-filter">
                            <select className="browser-default custom-select shadow-box-example z-depth-1">
                                <option>Active / Inactive</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </MDBCol>
                        <MDBCol md="3">
                            <MDBBtn color="info-color" onClick={this.logout} className="form-control shadow-box-example z-depth-1" size="lg">logout</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBTable className="table-margin-top shadow-box-example z-depth-1">
                        <MDBTableHead color="info-color" textWhite>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>blabla</td>
                                <td>Mark</td>
                                <td>MArk Jowen</td>
                                <td>Medes</td>
                                <td>Active</td>
                                <th><MDBBtn rounded color="info" size="sm">Edit</MDBBtn></th>
                            </tr>
                            <tr>
                                <td>blabla</td>
                                <td>Mark</td>
                                <td>MArk Jowen</td>
                                <td>Medes</td>
                                <td>Active</td>
                                <th><MDBBtn rounded color="info" size="sm">Edit</MDBBtn></th>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBContainer>
            </div>
        )
    }
}

export default management
