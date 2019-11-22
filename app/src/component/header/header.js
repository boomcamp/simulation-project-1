import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse } from "mdbreact";
class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
        <MDBNavbar color="info-color-dark shadow-box-example z-depth-2" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Project Simulation 1</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          </MDBCollapse>
        </MDBNavbar>

    );
  }
}

export default NavbarPage;