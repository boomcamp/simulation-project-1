import React, {useEffect, useState} from 'react';
import axios from 'axios'
import MaterialTable from 'material-table'
import { withSnackbar } from 'notistack';

function UsersTable({enqueueSnackbar}) {
    const [state, setState] = useState({
        columns: [
            { title: '', 
            field: 'active', 
            lookup: {   true: '🔵',
                        false: '🔴'
                    },
            cellStyle:{ width: '1%', 
                        textAlign: 'center',
                      },
            },
            { title: 'Username', field: 'username', filterPlaceholder: "Filter Username" },
            { title: 'Email', field: 'email', filterPlaceholder: "Filter Email"  },
            { title: 'First Name', field: 'firstName', filterPlaceholder: "Filter Firstname"  },
            { title: 'Last Name', field: 'lastName', filterPlaceholder: "Filter Lastname"  },

        ],
        data: [],
    });       

    useEffect(() => {
        let isCancelled = false;
            axios
                .get('http://localhost:3000/users/', { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
                })
                .then(res => {
                    if (!isCancelled)
                        setState( (prevState) => { return {...prevState, data: res.data} })
                        enqueueSnackbar('Welcome!', {autoHideDuration: 1000,})
                })
                .catch(err => console.log(err))
        return () => {
            isCancelled = true;
        };
    }, [enqueueSnackbar])

    const deleteMultiple = (users) => {
        users.map(user => {
            axios.delete(`http://localhost:3000/users/${user.id}`, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
            })
            .then(res => { 
                console.log(res) 
                enqueueSnackbar('Users have been Deleted', {variant: 'success', autoHideDuration: 1000,})
            })
            .catch(err => { 
                console.log(err) 
                enqueueSnackbar('Error Deleting users', {variant: 'error', autoHideDuration: 1000,})
            });
            return user;
        })
    }
    
    const deleteUser = (user) => {
        axios.delete(`http://localhost:3000/users/${user}`, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        })
        .then(res => { 
            console.log(res) 
            enqueueSnackbar('User has been Deleted', {variant: 'success', autoHideDuration: 1000,})
        })
        .catch(err => { 
            console.log(err) 
            enqueueSnackbar('Error Deleting user', {variant: 'error', autoHideDuration: 1000,})
        });
    }
    
    const updateUser = (oldData, newData) => {
        axios.put(`http://localhost:3000/users/${newData.id}`, {
                "username": newData.username,
                "email": newData.email,
                "firstName": newData.firstName,
                "lastName": newData.lastName,
                "password": newData.password,
                "plainPassword": newData.plainPassword,
                "active": newData.active
            },
            { 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` 
            } 
        })  
        .then(res => {
            console.log(res) 
            enqueueSnackbar('User has been Updated', {variant: 'success', autoHideDuration: 1000,})
        })
        .catch(err => {
            console.log(err) 
            enqueueSnackbar('Error Updating user', {variant: 'error', autoHideDuration: 1000,})
        });
    }
      
    return (
        <React.Fragment>
            <MaterialTable
                style={{
                        width: `60%`, 
                        margin: `80px auto`, 
                        boxShadow: `-4px 10px 16px -9px rgba(0,0,0,0.75)`,
                        borderRadius: `8px`
                      }}
                title="Manage Users"
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: newData => 
                        new Promise(resolve => {
                            console.log(newData)
                            setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
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

                    onRowDelete: oldData =>
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
                    headerStyle:{
                                    backgroundColor: '#696969',
                                    color: '#fff'
                                }
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
                            let toRemove = removeData.map(x => x.id)
                            for(let i=0; i<=data.length-1; i++) {
                                if(toRemove.includes(data[i].id)){
                                data.splice(i, 1);
                                i --;
                                }
                            }
                            return { ...prevState, data };
                            });               
                        }, 600);
                        }).then(deleteMultiple(removeData)),
                }
                ]}
            />
        </React.Fragment>
    )
}

export default withSnackbar(UsersTable);