import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import MaterialTable from "material-table";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Snackbar } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles({
  // success: {
  //   backgroundColor: "green",
  // },
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650
  },
  
  title: {
    border: "solid 1px"
  },
  name:{
  }
});

class ManageUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      active: " ",
      query: "",
      snackbarState: false,
      snackbarMessage: "",
      filteredData: [],
      filter: [],
      columns: [
        { title: "Username", field: "username" },
        { title: "Email", field: "email" },
        { title: "FirstName", field: "firstName" },
        { title: "LastName", field: "lastName" },
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
  onLogout = () => {
    localStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.setItem('notif', 'Notif');
    this.props.history.push("/");
   
    
  };

  componentDidMount() {
    
    let loginAuth = localStorage.getItem('auth') ? true : false

    let name =localStorage.getItem("name")
    console.log(name)
    if (!localStorage.getItem("accessToken")) {
      this.props.history.push("/");
    }

    if(loginAuth){
      this.handleOpenSnackbar('Successfully Login')
      localStorage.removeItem('auth')
    }

    this.getData();
  }

  handleCloseSnackbar = () => {
    this.setState({ snackbarState: false, snackbarMessage: "" });
  };
  handleOpenSnackbar = message => {
    this.setState({ snackbarState: true, snackbarMessage: message });
  };
  getData = () => {
    axios
      .get("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })

      .then(res => {
        const { query } = this.state;
        const filteredData = res.data.filter(element => {
          return element.firstName.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data: res.data
        });
      });
  };

  handleStatus = event => {
    if (event.target.value === " ") {
      this.getData();
      this.setState({
        active: " "
      });
    } else {
      console.log(event.target.value);
      axios
        .get(`http://localhost:3000/users?active=${event.target.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
        .then(res => {
          this.setState({
            data: res.data
          });
        });
      this.setState({
        active: event.target.value
      });
    }
  };
  render() {
    const { classes } = this.props;


    
    
    return (
      <React.Fragment>
        <Snackbar
       
          open={this.state.snackbarState}
          message={
            <span style={{display: 'flex', alignItems: 'center'}}>
              <CheckCircleIcon style={{marginRight: 5}} />
              {this.state.snackbarMessage}
            </span>
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          ContentProps={{
            style:{
              backgroundColor:"darkgreen"
            }
          }}
          autoHideDuration={1000}
          onClose={this.handleCloseSnackbar} 
           
        />

        <div>
          <AppBar position="static">
            <Toolbar
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
              item xl={1} >
              <Typography variant="h6" className={classes.title}>
                Manage Account
              </Typography>
              </Grid>

              <Grid 
              item xl={3}>
              <span>{localStorage.getItem("name")} </span> &nbsp;|
              <Button color="inherit" onClick={this.onLogout}>
                LogOut
              </Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <div
           style={{
            padding:"0 100px 100px"
          }}>
          <Grid container>
            <Grid
              item
              xl={2}
              lg={2}
              md={5}
              sm={4}
              xs={5}
              style={{ padding: 20 }}
            >
              <FormControl
                className={classes.formControl}
                style={{ width: "100%" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Filter by Status
                </InputLabel>
                <Select
                  // labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={this.handleStatus}
                  value={this.state.active}
                >
                  <MenuItem value=" ">All</MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

        
          <MaterialTable
         
            title="Manage users"
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
                        this.handleOpenSnackbar("Successfully Edit")

                        return { ...prevState, data };
                      });
                    }
                  }, 600);

                  axios
                    .patch(
                      `http://localhost:3000/users/${newData.id}`,
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
                            "Bearer " + localStorage.getItem("accessToken")
                        }
                      }
                    )
                    
                })
            }}
          />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(ManageUser);
