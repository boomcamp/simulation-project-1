import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Navigation from './Navigation'
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [origUsers,setOrigUsers] = useState([]);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = React.useState(false);
  const [searchVal, setSearchVal] = useState('')
  const [session, setSession] = useState(false)
  const handleChange = (row) => {
    // setSelected(row)
    if(row.active === true){
      setSelected({
        ...row,
        active: false
      })
    }else if(row.active === false){
      setSelected({
        ...row,
        active: true
      })
    }
    
  };

  
  const handleSearch =(e)=>{
      const filteredUsers = origUsers.filter(el => el.username.toLowerCase().indexOf(e.toLowerCase()) !== -1)
      setUsers(filteredUsers)
  }

  const updateUser =(e)=>{
    e.preventDefault()
    var accessToken = localStorage.getItem("accessToken");
    axios({
      method: "put",
      url: `http://localhost:4000/users/${selected.id}`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: selected
    })
    .then(data =>
      renderData(),
      handleClose()
    )
   
  }

  const editValue =(e) =>{
    setSelected({
      ...selected,
      [e.target.name]: e.target.value
    })
  }

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelected(row)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    renderData();
  }, []);

  const renderData = () => {
    var accessToken = localStorage.getItem("accessToken");
    axios({
      method: "get",
      url: `http://localhost:4000/users`,
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(data => {
      setUsers(data.data);
      setOrigUsers(data.data)
    })
    .catch(err => setSession(true));
  };

  const redirectFn = () => {
    return (session) && <Redirect push to="/" />;
  }
  

  return (
    <React.Fragment>
      {redirectFn()}
      <Navigation />
      <CssBaseline />
      <Container maxWidth="lg" className="manage-cont">
        <div className="manage-container">
          <h1>Manage Users</h1>
          <TextField 
          id="standard-basic" 
          label="Search"
          onChange={((e) => handleSearch(e.target.value))}
          
          />
        </div>
        
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>
                    <FiberManualRecordIcon
                      style={{ color: row.active ? "green" : "red", width: "15px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() =>handleClickOpen(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
        maxWidth="sm"
          >
          <form onSubmit={updateUser}>
            <DialogTitle id="alert-dialog-title">
              Edit User info
            </DialogTitle>
            <DialogContent className="dialogContent">
              <TextField 
                required
                id="standard-basic" 
                label="Fistname" 
                className="yeBox"
                name="firstName"
                onChange={(e) => editValue(e)}
                defaultValue={selected.firstName} /> <br/>
              <TextField 
                required
                id="standard-basic" 
                label="Lastname" 
                className="yeBox"
                name="lastName"
                onChange={(e) => editValue(e)}
                defaultValue={selected.lastName} /> <br/>
              <TextField 
                required
                id="standard-basic" 
                label="Username" 
                name="username"
                className="yeBox"
                onChange={(e) => editValue(e)}
                defaultValue={selected.username} /> <br/>
              <TextField 
                required
                id="standard-basic" 
                label="E-mail" 
                className="yeBox"
                type="email"
                name="email"
                onChange={(e) => editValue(e)}
                defaultValue={selected.email} /><br/>
              <Switch
                checked={selected.active}
                onClick={() => handleChange(selected)}
                value={selected.active}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
