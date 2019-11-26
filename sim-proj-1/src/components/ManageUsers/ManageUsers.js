import React from 'react'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import UsersTable from './UsersTable'

export default function ManageUsers() {
  if(!localStorage.getItem('token')) 
    return <Redirect to="/" />

  return (
    <React.Fragment>
      <Header />
      <UsersTable />
    </React.Fragment>
  );
}