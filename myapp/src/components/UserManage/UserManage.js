import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import Filter from "./Filter/Filter";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
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

export default class UserManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: null,
      toggleStateA: false,
      modal: false,
      modal_user: false,
      users: [],
      select: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
  }
  componentDidMount = () => {
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/usermanage");
    }
    axios
      .get(`http://localhost:3000/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(results => {
        results.data.map(item => {
          //console.log(item.active);
          this.setState({
            users: this.state.users.concat({
              id: item.id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              username: item.username,
              active:
                item.active === false || item.active === "false" ? (
                  <span>
                    <MDBIcon icon="circle" style={{ color: "red" }} />
                  </span>
                ) : item.active === true || item.active === "true" ? (
                  <span>
                    <MDBIcon icon="circle" style={{ color: "green" }} />
                  </span>
                ) : (
                  "No status"
                ),
              option: (
                <MDBBtn
                  color="blue"
                  value={JSON.stringify(item)}
                  size="sm"
                  onClick={e => this.handleClick(e.target.value)}
                >
                  Edit
                </MDBBtn>
              )
            })
          });
        });
      });
  };
  handleSelect(selectedElement) {
    // console.log(selectedElement);
    this.setState({ users: selectedElement });
  }
  updateText(val) {
    //console.log(val.value);
    this.setState({
      [val.name]: val.value
    });
  }
  updateUsers() {
    //console.log(this.state);

    axios
      .put(
        `http://localhost:3000/users/${this.state.id}`,
        {
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          username: this.state.username,
          active: this.state.active,
          password: this.state.password
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then(response => {
        toast.success("Successfully Updated!");
        this.setState({
          modal_user: false
        });
        this.loadAgain();
      });
  }
  loadAgain = () => {
    this.setState({ users: [] });
    axios
      .get(`http://localhost:3000/users`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(results => {
        //console.log(results.data);
        results.data.map(item => {
          console.log(item);
          this.setState({
            users: this.state.users.concat({
              id: item.id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              username: item.username,
              active:
                item.active === false || item.active === "false" ? (
                  <span>
                    <MDBIcon icon="circle" style={{ color: "red" }} />
                  </span>
                ) : item.active === true || item.active === "true" ? (
                  <span>
                    <MDBIcon icon="circle" style={{ color: "green" }} />
                  </span>
                ) : (
                  "No status"
                ),
              option: (
                <MDBBtn
                  color="blue"
                  value={JSON.stringify(item)}
                  size="sm"
                  onClick={e => this.handleClick(e.target.value)}
                >
                  Edit
                </MDBBtn>
              )
            })
          });
        });
      });
  };

  handleClick = e => {
    const x = JSON.parse(e);
    //console.log();
    this.setState({
      email: x.email,
      firstName: x.firstName,
      lastName: x.lastName,
      username: x.username,
      active: x.active,
      password: x.password,
      id: x.id,
      modal_user: true
    });
  };
  handleToggleClickA = () => {
    this.setState({
      toggleStateA: !this.state.toggleStateA
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggle2 = () => {
    this.setState({
      modal_user: !this.state.modal_user
    });
  };

  logout() {
    localStorage.clear("token");
    this.props.history.push("/");
  }

  render() {
    // console.log(this.state.active);
    // console.log(this.state.selectedUser ? this.state.selectedUser.email : null);
    // console.log(this.state.selectedUser);
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
          label: "Status",
          field: "active",
          sort: "asc",
          width: 200
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
      <Router>
        <ToastContainer />

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
              <Filter select={this.handleSelect} />
              {/* LogoutModal */}
              <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>
                  LOGOUT CONFIRMATION
                </MDBModalHeader>
                <MDBModalBody>Are you sure you want to logout?</MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="red" onClick={this.toggle}>
                    Close
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={this.logout}>
                    Confirm
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModal>
              {/* UserModal */}
              <MDBModal isOpen={this.state.modal_user} toggle={this.toggle2}>
                <MDBModalHeader toggle={this.toggle2}>
                  USERS INFORMATION
                </MDBModalHeader>
                <MDBModalBody>
                  <Fragment>
                    <div className="form-group">
                      <label htmlFor="example2">Email</label>
                      <input
                        type="text"
                        id="example2"
                        name="email"
                        className="form-control form-control-md"
                        defaultValue={
                          this.state.email ? this.state.email : null
                        }
                        onChange={e => this.updateText(e.target)}
                      />
                      <label htmlFor="example2">Firstname</label>
                      <input
                        type="text"
                        className="form-control form-control-md"
                        name="firstName"
                        defaultValue={
                          this.state.firstName ? this.state.firstName : null
                        }
                        onChange={e => this.updateText(e.target)}
                      />
                      <label htmlFor="example2">Lastname</label>
                      <input
                        type="text"
                        className="form-control form-control-md"
                        name="lastName"
                        defaultValue={
                          this.state.lastName ? this.state.lastName : null
                        }
                        onChange={e => this.updateText(e.target)}
                      />
                      <label htmlFor="example2">Username</label>
                      <input
                        type="text"
                        className="form-control form-control-md"
                        name="username"
                        defaultValue={
                          this.state.username ? this.state.username : null
                        }
                        onChange={e => this.updateText(e.target)}
                      />
                      <br></br>
                      <select
                        className="browser-default custom-select"
                        name="active"
                        onChange={e => this.updateText(e.target)}
                        defaultValue={
                          this.state.active ? this.state.active : null
                        }
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </Fragment>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="red" onClick={this.toggle2}>
                    Close
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={this.updateUsers}>
                    Save Changes
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModal>

              {/* {this.state.users.map((user, i) => user.firstname)} */}
              <MDBDataTable striped bordered hover data={data} />
            </MDBContainer>
          </main>
        </div>
      </Router>
    );
  }
}
