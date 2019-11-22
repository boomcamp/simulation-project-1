import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import Header from './Header'

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: 'Active', field: 'active', lookup: { true: <p className="active"></p>, false: <p className="inactive"></p>}, cellStyle: {width: '1%'} },
      { title: 'Username', field: 'username' },
      { title: 'Email', field: 'email' },
      { title: 'First Name', field: 'fname' },
      { title: 'Last Name', field: 'lname' },

    ],
    data: [],
  });
  
  useEffect(() => {
    let isCancelled = false;
      axios
        .get('http://localhost:3000/users/', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        })
        .then(res=> {
          let temp=[]
          res.data.map(user => { 
            return temp.push({id: user.id, active: user.active, username: user.username, email: user.email, fname: user.firstName, lname: user.lastName})
          })
          if (!isCancelled)
            setState({...state, data: temp})
      })

    return () => {
        isCancelled = true;
    };
       
  }, [])


  const deleteMultiple = (users) => {
    users.map(user => {
      axios.delete(`http://localhost:3000/users/${user.id}`, { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        }).then(res => { console.log(res) })
          .catch(err => { console.log(err) });
    })
  }

  const deleteUser = (user) => {
    axios.delete(`http://localhost:3000/users/${user}`, { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        }).then(res => { console.log(res) })
          .catch(err => { console.log(err) });
  }

  const updateUser = (oldData, newData) => {
    axios.put(`http://localhost:3000/users/${newData.id}`, {
          "username": newData.username,
          "email": newData.email,
          "firstName": newData.fname,
          "lastName": newData.lname,
          "active": newData.active
        },
        { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` 
        } 
    }).then(res => {console.log(res) })
      .catch(err => {console.log(err) });
  }

  if(!localStorage.getItem('token')) 
    return <Redirect to="/" />

  return (
    <React.Fragment>
      <Header />
      <MaterialTable
        style={{width: `60%`, margin: `80px auto`}}
        title="Manage Users"
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
                }           
              }, 600);
            }).then(updateUser(oldData, newData)),

          onRowDelete:
          oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });               
              }, 600);
            }).then(deleteUser(oldData.id)),
        }}

        options={{
          actionsColumnIndex: -1,
          selection: true,
          filtering: true,
        }}
        actions={[
          {
            tooltip: 'Remove All Selected Users',
            icon: 'delete',
            onClick: (evt, removeData) => 
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                        for (var i=0; i<=removeData.length-1; i++){
                          // for (var j=0; j<=data.length-1; j++){
                            if(removeData[i].id === data[i].id){
                              data.splice(removeData[i],1);
                            // }
                          }
                        }
                      return { ...prevState, data };
                    });               
                  }, 600);
                })// .then(deleteMultiple(data)),
          }
        ]}
      />
    </React.Fragment>
  );
}