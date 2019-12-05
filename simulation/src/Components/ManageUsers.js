import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import { Redirect } from 'react-router-dom';

export default function MaterialTableDemo() {
  const [ session, setSession ] = useState(false)
  const [state, setState] = React.useState({
    columns: [
      { title: 'Username', field: 'username' },
      { title: 'Email', field: 'email' },
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: "Status", field: "active", 
        lookup: {
          true: (
          'Active'
          ),
          false: (
            'InActive'
          )
        }
      }
    ],
    data: []
  });
 
  useEffect(() => {
    submitUserData()
  },[]);

  const submitUserData = () =>{
    let token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: 'http://localhost:4000/users',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then( response =>  {
      setState({
        ...state,
        data: response.data 
      })
    })
    .catch(err=>{
      setSession(true)

    })
  }

  const redirectFn = () => {
    return (session) && <Redirect push to="/" />;
  }
  
  const updateFn = (updatedData) => {
    let token = localStorage.getItem('token')
    axios({
          method: "put",
          url: `http://localhost:3000/users/${updatedData.id}`,
          data: updatedData,
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          console.log("updated")
        })
        .catch((error) => {
          console.log("updated")
        })
  }
  return (
    <>
    <CssBaseline />
      <br/>
      <br/>
    <Container width="80%">
    {redirectFn()}
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                  {updateFn(newData)}
                }
              }, 600);
            })
        }}
      />
    </Container>
    </>
  );
}