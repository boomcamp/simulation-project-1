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
import DataTable from "react-data-table-component";

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
          field: "active"
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
    console.log(this.state.data);
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
                })
            }}
          />
        </Cont2>
      </Div>
    );
  }
}
