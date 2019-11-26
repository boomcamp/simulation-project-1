import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';




export default class Navigation extends Component{



  render(){
    var accessToken = localStorage.getItem("accessToken")
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className="nav-container">
          
          {accessToken ? null : <Link to="/" className="link-btn">Login</Link>}
          {accessToken ? null : <Link to="/register" className="link-btn">Register</Link> }
          {accessToken ? <Link to="/manage-users" className="link-btn">Manage Users</Link> 
          : null}
          {accessToken ? <Link to="/logout" className="link-btn">Log out</Link>
          : null}
        
      </Container>
      </React.Fragment>
      
    );
  }
}