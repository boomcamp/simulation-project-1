import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import styled from "styled-components";
import { toast } from "react-toastify";
import "./User.css";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

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
  MDBIcon
} from "mdbreact";

const Div = styled.div`
  width: 100%;
  padding: 80px;
  background-color: whitesmoke;
`;

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      columns: [
        { title: "Username", field: "username", filtering: false },

        {
          title: "Email Address",
          field: "email",
          filtering: false
        },
        { title: "First Name", field: "firstName", filtering: false },
        { title: "Last Name", field: "lastName", filtering: false },

        {
          title: "Active",
          field: "active",
          lookup: {
            true: "Active",
            false: "Inactive"
          },
          render: rowData =>
            rowData.active === true || rowData.active === "true" ? (
              <div>
                <FiberManualRecordIcon
                  style={{ color: "green", width: "20px" }}
                />
                <span> Active</span>
              </div>
            ) : (
              <div>
                <FiberManualRecordIcon
                  style={{ color: "red", width: "20px" }}
                />
                <span> Inactive</span>
              </div>
            )
        }
      ],
      data: []
    };
  }
  componentDidMount = () => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { handleLogout, accessToken } = this.props;
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
          <MaterialTable
            title="All Users"
            columns={this.state.columns}
            data={this.state.data}
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10,
              filtering: true
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 400);
                  axios
                    .patch(
                      `http://localhost:3000/users/${newData.id}`,
                      {
                        email: newData.email,
                        username: newData.username,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        active: newData.active
                      },
                      {
                        headers: { Authorization: `Bearer ${accessToken}` }
                      }
                    )
                    .then(
                      toast.success("Account has been Successfully Edited!")
                    )
                    .catch(() => toast.success("Error Encountered!"));
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                  axios
                    .delete(`http://localhost:3000/users/${oldData.id}`, {
                      headers: { Authorization: `Bearer ${accessToken}` }
                    })
                    .then(
                      toast.success("Account has been Successfully Deleted!")
                    )
                    .catch(() => toast.success("Error Encountered!"));
                })
            }}
          />
        </Div>
      </div>
    );
  }
}

export default Users;
