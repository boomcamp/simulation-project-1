import React from "react";
import styled from "styled-components";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBDataTable
} from "mdbreact";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      data: {
        columns: [
          {
            label: "Name",
            field: "name",
            sort: "asc",
            width: 150
          },
          {
            label: "Position",
            field: "position",
            sort: "asc",
            width: 270
          },
          {
            label: "Office",
            field: "office",
            sort: "asc",
            width: 200
          },
          {
            label: "Age",
            field: "age",
            sort: "asc",
            width: 100
          },
          {
            label: "Start date",
            field: "date",
            sort: "asc",
            width: 150
          },
          {
            label: "Salary",
            field: "salary",
            sort: "asc",
            width: 100
          }
        ],
        rows: [
          {
            name: "Tiger Nixon",
            position: "System Architect",
            office: "Edinburgh",
            age: "61",
            date: "2011/04/25",
            salary: "$320"
          },
          {
            name: "Garrett Winters",
            position: "Accountant",
            office: "Tokyo",
            age: "63",
            date: "2011/07/25",
            salary: "$170"
          },
          {
            name: "Ashton Cox",
            position: "Junior Technical Author",
            office: "San Francisco",
            age: "66",
            date: "2009/01/12",
            salary: "$86"
          },
          {
            name: "Cedric Kelly",
            position: "Senior Javascript Developer",
            office: "Edinburgh",
            age: "22",
            date: "2012/03/29",
            salary: "$433"
          },
          {
            name: "Airi Satou",
            position: "Accountant",
            office: "Tokyo",
            age: "33",
            date: "2008/11/28",
            salary: "$162"
          },
          {
            name: "Brielle Williamson",
            position: "Integration Specialist",
            office: "New York",
            age: "61",
            date: "2012/12/02",
            salary: "$372"
          },
          {
            name: "Herrod Chandler",
            position: "Sales Assistant",
            office: "San Francisco",
            age: "59",
            date: "2012/08/06",
            salary: "$137"
          }
        ]
      }
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { handleLogout } = this.props;
    return (
      <div>
        <MDBNavbar color="red" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Manage Users</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right className="dropdown-default">
                    <MDBDropdownItem onClick={() => handleLogout()}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <Div>
          <MDBDataTable
            style={{ width: "1200px" }}
            striped
            bordered
            hover
            data={this.state.data}
          />
        </Div>
      </div>
    );
  }
}

export default Users;
