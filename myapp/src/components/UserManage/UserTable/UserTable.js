import React, { Component } from "react";
import axios from "axios";
import { MDBDataTable, MDBBtn } from "mdbreact";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBContainer
} from "mdbreact";
export default class UserTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: null,
      toggleStateA: false,
      modal: false,
      modal_user: false,
      users: []
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(results => {
        console.log(results.data);
        results.data.map(item => {
          this.setState({
            users: this.state.users.concat({
              id: item.id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              username: item.username,
              option: (
                <MDBBtn color="green" value={item.id} size="sm">
                  Edit
                </MDBBtn>
              )
            })
          });
        });
      });
  }
  render() {
    const mainStyle = {
      paddingTop: "5rem"
    };

    const specialCaseNavbarStyles = {
      WebkitBoxOrient: "horizontal",
      flexDirection: "row"
    };

    const data = {
      columns: [
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 150
        },
        {
          label: "Firstname",
          field: "firstName",
          sort: "asc",
          width: 270
        },
        {
          label: "Lastname",
          field: "lastName",
          sort: "asc",
          width: 200
        },
        {
          label: "Username",
          field: "username",
          sort: "asc",
          width: 100
        },
        {
          label: "Option",
          field: "option",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.state.users
    };
    return (
      <div>
        <div className="mdb-skin">
          <MDBNavbar
            double
            expand="md"
            fixed="top"
            scrolling
            color="blue"
            style={{ color: "white" }}
          >
            <MDBNavbarNav left>
              <MDBNavItem>
                <div
                  onClick={this.handleToggleClickA}
                  key="sideNavToggleA"
                  style={{
                    lineHeight: "32px",
                    marginRight: "1em",
                    verticalAlign: "middle"
                  }}
                >
                  <MDBIcon icon="bars" color="white" size="2x" />
                </div>
              </MDBNavItem>
              <MDBNavItem
                className="d-none d-md-inline"
                style={{ paddingTop: 5 }}
              >
                Manage Users Page
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right style={specialCaseNavbarStyles}>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret style={{ color: "white" }}>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="" onClick={this.toggle}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBNavbar>

          <main style={mainStyle}>
            <MDBContainer fluid className="mt-5">
              {/* {this.state.users.map((user, i) => user.firstname)} */}
              <MDBDataTable striped bordered hover data={data} />
            </MDBContainer>
          </main>
        </div>
      </div>
    );
  }
}
