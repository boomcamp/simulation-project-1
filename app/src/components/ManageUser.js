import React, { useState , useEffect } from 'react';
import axios from 'axios';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

function ManageUser(props) {
    const classes = useStyles();
    let token = JSON.parse(localStorage.getItem('token'));
    const [users, setUsers] = useState([])
    const [active, setActive] = useState('')

    const handleDisplay = () => {
        axios
            .get('http://localhost:4001/users', 
                { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        handleDisplay();
        if (!localStorage.getItem("token")) {
            props.history.push("/");
        }
        let login = localStorage.getItem('notif') ? true : false
        if(login){
            toast.success(JSON.parse(localStorage.getItem('notif')))
            localStorage.removeItem('notif')
        }
    }, [])

    const logout = () => {  
        localStorage.removeItem('token');
        localStorage.setItem('notif',JSON.stringify('Succesfully Logged Out.'));
        props.history.push('/');  
    }
    const [state, setState] = useState({
        columns: [
          { title: 'Email', field: 'email'},
          { title: 'Username', field: 'username'},
          { title: 'First Name', field: 'firstName' },
          { title: 'Last Name', field: 'lastName' },
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
          
        ],
      });
    const handleUpdate = (newData) => {
        axios
            .patch(`http://localhost:4001/users/${newData.id}`,{
                username: newData.username,
                email: newData.email,
                firstName: newData.firstName,
                lastName: newData.lastName,
                active: newData.active
            },{
                headers: {Authorization:`Bearer ${token}`}
            }).then(res => {
                props.history.push('/');  
            })
    }
    const handleStatus = event => {
        if (event.target.value === " ") {
            handleDisplay();
          } else {
            axios
              .get(`http://localhost:4001/users?active=${event.target.value}`, {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
              })
              .then(res => {
                setUsers(res.data)
              });
          }
    };
    
    return (
        <div className='home'>
            <ToastContainer enableMultiContainer position={toast.POSITION.TOP_RIGHT} />
            <div className='title'>
                <FormControl
                    className={classes.formControl}
                    style={{ width: "200px" }}
                    >
                    <InputLabel id="demo-simple-select-label">
                        Filter by Status
                    </InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={handleStatus}
                        value={active}
                    >
                        <MenuItem value=" ">All</MenuItem>
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={logout}>
                    Log Out
                </Button>
            </div>
            <MaterialTable
                title="Simulation Project"
                option = {{pageSize:10}}
                columns={state.columns}
                data={users}
                editable={{
                    onRowUpdate: (newData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        handleUpdate(newData);
                        }, 600);
                    }),
                }}
            />
        </div> 
    );
}
export default ManageUser

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));