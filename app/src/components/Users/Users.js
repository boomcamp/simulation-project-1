import React from "react";
import "./Users.css";
import MaterialTable from "material-table";
import axios from "axios";
import green from "../../images/green.png";
import red from "../../images/red.png";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Email",
          field: "email",
          filtering: false,
          initialEditValue: "initial edit value"
        },
        {
          title: "Username",
          field: "username",
          filtering: false
        },

        {
          title: "First Name",
          field: "firstName",
          filtering: false
        },
        {
          title: "Last Name",
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
            rowData.active === true ? (
              <span>
                <img src={green} alt="" />
                <span className="sTatus">Active</span>
              </span>
            ) : (
              <span>
                <img src={red} alt="" />
                <span className="sTatus">Inactive</span>
              </span>
            )
        }
      ],
      data: []
    };
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:3000/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
      .then(results => {
        this.setState({ data: results.data });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <p className="logo">User Management</p>
          <div className="header-right">
            <button className="handleLogout" onClick={this.props.handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <MaterialTable
          title="Users"
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
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                      }
                    }
                  )
                  .then(alert("Successfully Edited!"));
              })
          }}
          options={{
            headerStyle: {
              backgroundColor: "skyblue"
            },
            filtering: true
          }}
        />
      </div>
    );
  }
}
