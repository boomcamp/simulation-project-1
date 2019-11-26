import React, { Component } from 'react'
import axios from 'axios';

import MaterialTable from 'material-table'
import { Chip, AppBar, Toolbar, Typography } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { message } from 'antd';
import { Popconfirm } from 'antd';

export default class Homepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      active: " ",
      columns: [
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Username', field: 'username' },
        {
          title: 'Status',
          field: 'active',
          lookup: {
            true: <FiberManualRecordIcon style={{ color: 'green', width: '17px' }} />,
            false: <FiberManualRecordIcon style={{ color: 'red', width: '17px' }} />
          },
        },
      ],
    }
  }

  componentDidMount() {
    //console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') != null) {
      this.props.history.push('/homepage')
      axios
        .get(`http://localhost:3000/users`, {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(datas => {
          //console.log(datas)
          this.setState({ data: datas.data })
        })
    }
    else {
      this.props.history.push("/")
    }
  }

  handleLogout = () => {
    localStorage.clear()
    this.props.history.push('/signin')
    message.success("You have been logged out!")
  }

  handleStats = (e) => {
    console.log(e.target.value)
    if (e.target.value === " ") {
      axios
        .get(`http://localhost:3000/users`, {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(datas => {
          //console.log(datas)
          this.setState({ data: datas.data, active: " " })
        })
    } else {
      //console.log(e.target.value);
      axios
        .get(`http://localhost:3000/users?active=${e.target.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(res => {
          this.setState({
            data: res.data
          });
        });
      this.setState({
        active: e.target.value
      });
    }
  };


  render() {

    console.log(this.props)
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: '#212121' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Typography variant="h6" color='inherit'>
              Manage Users
            </Typography>
            <Popconfirm placement="leftTop" title='Are you Sure to logout?' onConfirm={this.handleLogout} okText="Yes" cancelText="No">
              <Chip icon={<ExitToAppIcon />} label="Logout" />
            </Popconfirm>

          </Toolbar>
        </AppBar>
        {/* <button onClick={this.handleLogout} >Logout</button> */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <FormControl style={{ width: "15%" }} >
            <InputLabel id="demo-simple-select-label">

            </InputLabel>
            <Select

              id="demo-simple-select"
              onChange={this.handleStats}
              value={this.state.active}
            >
              <MenuItem value=" ">All Status</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>


        <MaterialTable

          title="List Of Users"
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
                    message.success("Updated Successfully!")
                  }
                }, 600);
                axios
                  .patch(`http://localhost:3000/users/${newData.id}`,
                    {
                      username: newData.username,
                      email: newData.email,
                      firstName: newData.firstName,
                      lastName: newData.lastName,
                      active: newData.active
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                      }
                    }
                  )
                // .then(res => {
                //   this.setState({
                //     registeredUser: res.data
                //   })
                // })
              }),

          }}
        />

      </div>
    )
  }
}
