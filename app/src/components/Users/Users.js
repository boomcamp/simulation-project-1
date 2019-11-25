import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import logo from "../images/logo.svg";
import { FaUserCircle } from "react-icons/fa";
import MaterialTable from "material-table";
import { Cont2 } from "../Style/Style";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Div = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const Icon = styled.span`
  font-size: 30px;
  color: darkcyan;
`;
const Span = styled.span`
  text-transform: capitalize;
`;

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        { title: "Email", field: "email" },
        { title: "Username", field: "username" },
        {
          title: "Name",
          field: "firstName"
        },
        {
          title: "Surname",
          field: "lastName"
        },
        {
          title: "Active",
          field: "active",
          lookup: { true: "Active", false: "Inactive" }
        }
      ],
      data: []
    };
  }
  componentDidMount() {
    if (this.props.token !== null) {
      const url = "http://localhost:3000/users";
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then(res => {
          this.setState({
            data: res.data
          });
        });
    }
  }
  render() {
    const { handleLogOut } = this.props;
    return (
      <Div>
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#">
            <Img src={logo} />
            Manage Users
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>

          <Dropdown alignRight>
            <Dropdown.Toggle variant="none">
              <Icon>
                <FaUserCircle />
              </Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Span>{localStorage.getItem("email")}</Span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogOut()}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <Cont2>
          <MaterialTable
            title="Editable Example"
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10
            }}
            columns={this.state.columns}
            data={this.state.data}
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
                  }, 200);
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
                        headers: { Authorization: `Bearer ${this.props.token}` }
                      }
                    )
                    .then(() => {
                      const obj1 = {
                          email: newData.email,
                          username: newData.username,
                          firstName: newData.firstName,
                          lastName: newData.lastName,
                          active: newData.active
                        },
                        obj2 = {
                          email: oldData.email,
                          username: oldData.username,
                          firstName: oldData.firstName,
                          lastName: oldData.lastName,
                          active: oldData.active
                        };
                      JSON.stringify(obj1) !== JSON.stringify(obj2)
                        ? toast.info("Edit successful", {
                            position: toast.POSITION.TOP_CENTER
                          })
                        : toast("No changes were made", {
                            position: toast.POSITION.TOP_CENTER
                          });
                    })
                    .catch(() => toast.error("Something went wrong!"), {
                      position: toast.POSITION.TOP_CENTER
                    });
                })
            }}
          />
        </Cont2>
      </Div>
    );
  }
}
