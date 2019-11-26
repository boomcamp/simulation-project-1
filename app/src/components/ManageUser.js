import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import Header from "./header";

const useStyles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    maxWidth: 750
  },
  card: {
    marginTop: theme.spacing(9)
  }
});

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      token: localStorage.getItem("token"),
      active: " ",

      columns: [
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },
        {
          title: "Status",
          field: "active",
          lookup: {
            true: (
              <FiberManualRecordIcon
                style={{ color: "green", width: "15px" }}
              />
            ),
            false: (
              <FiberManualRecordIcon style={{ color: "red", width: "15px" }} />
            )
          }
        }
      ]
    };
  }
  componentDidMount(props) {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: "http://localhost:4007/users",
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      }).then(response => {
        this.setState({
          users: response.data
        });
      });
    } else {
      this.props.history.push("/component/login");
    }
  }

  loadAgain() {
    console.log("fg");
    axios({
      method: "get",
      url: "http://localhost:4007/users",
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }).then(response => {
      console.log(response.data);
      this.setState({
        users: response.data
      });
    });
  }
  handleStatus = event => {
    var data;
    if (event.target.value === " ") {
      data = "http://localhost:4007/users";
      this.setState({
        active: " "
      });
    } else {
      data = `http://localhost:4007/users?active=${event.target.value}`;
    }
    console.log(event.target.value);
    axios
      .get(data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({
          users: res.data
        });
      });
    this.setState({
      active: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header
          logout={() => {
            this.props.history.push("/component/login");
          }}
        />
        <div></div>
        <div className={classes.card}>
          <FormControl
            className={classes.formControl}
            style={{ width: "200px" }}
          >
            <InputLabel id="demo-simple-select-label">
              Filter by Status
            </InputLabel>
            <Select
              id="demo-simple-select"
              onChange={this.handleStatus}
              value={this.state.active}
            >
              <MenuItem value=" ">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
          <MaterialTable
            title="Users"
            columns={this.state.columns}
            data={this.state.users}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      this.setState(prevState => {
                        const data = [...prevState.users];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                  axios
                    .patch(
                      `http://localhost:4007/users/${newData.id}`,
                      {
                        username: newData.username,
                        email: newData.email,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        active: newData.active
                      },
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token")
                        }
                      }
                    )
                    .then(res => this.loadAgain());
                })
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(ManageUser);
