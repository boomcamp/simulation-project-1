import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import { FaUserCircle, FaRegListAlt } from "react-icons/fa";
import MaterialTable from "material-table";
import { Cont2 } from "../Style/Style";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import green from "../images/green.png";
import red from "../images/red.png";

const Div = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
const Icon = styled.span`
  font-size: 30px;
  color: white;
`;
const Img = styled.img`
  height: 15px;
  margin: 0 5px 0 0;
`;

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        { title: "Email", field: "email", filtering: false },
        { title: "Username", field: "username", filtering: false },
        {
          title: "Name",
          field: "firstName",
          filtering: false
        },
        {
          title: "Surname",
          field: "lastName",
          filtering: false
        },
        {
          title: "Active",
          field: "active",
          lookup: {
            true: "Active",
            false: "Inactive"
          },
          render: rowData =>
            rowData.active === true || rowData.active === "true" ? (
              <span>
                <Img src={green} />
                <span>Active</span>
              </span>
            ) : (
              <span>
                <Img src={red} />
                <span>Inactive</span>
              </span>
            )
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
  handleUpdate = (newData, oldData) => {
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
  };
  handleDelete = oldData => {
    axios
      .delete(`http://localhost:3000/users/${oldData.id}`, {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(() => {
        toast.info("Delete successful", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() =>
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER
        })
      );
  };
  render() {
    const { handleLogOut } = this.props;
    return (
      <Div>
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
          <FaRegListAlt style={{ color: "white", fontSize: "25px" }} />
          <Navbar.Brand style={{ padding: "0 0 0 10px" }}>
            Manage Users
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="primary">
              <Icon>
                <FaUserCircle />
              </Icon>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>{localStorage.getItem("email")}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleLogOut()}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <Cont2>
          <MaterialTable
            title="List of Users"
            options={{
              pageSizeOptions: [10, 15, 20],
              pageSize: 10,
              filtering: true
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
                  }, 600);
                  this.handleUpdate(newData, oldData);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    this.setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                    resolve();
                  }, 600);
                  this.handleDelete(oldData);
                })
            }}
          />
        </Cont2>
      </Div>
    );
  }
}
