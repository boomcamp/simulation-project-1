import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';

import Checkbox from '@material-ui/core/Checkbox';

function DeleteData(data){

  axios.delete(`http://localhost:3000/users/${data}`,{ 
    headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } 
    })
  .then(data=>console.log(data))
  .catch(e=>console.log(e));
}

function EditData(newdata, olddata){
  axios.put(`http://localhost:3000/users/${olddata.id}`,{
    "username" : newdata.username,
    "firstName" : newdata.firstname,
    "lastName" : newdata.lastname,
    "email" : newdata.email,
    "active" : newdata.active,
    "password" : olddata.password
  },{ 
    
    headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } 
    })
  .then(data=>console.log(data))
  .catch(e=>console.log(e));
}

export default function UserTable3(props) {

    const [state, setState] = React.useState({
        columns: [
          {title: 'User Name', field: 'username', filtering: false},
          {title: 'First Name', field: 'firstname', filtering: false },
          {title: 'Last Name', field: 'lastname', filtering: false },
          {title: 'Email', field: 'email', filtering: false},
          {title: 'Active', field: 'active', 
            lookup : {true:'Active',
                      false:'inActive'},
            cellStyle : {maxWidth: '10px'},
            render: rowData => {
              return (rowData.active === 'true' ? <div className='active-icon' value='c'/> : <div 
              className='inactive-icon' value='0'/>
            )}  

            ,editComponent: props =>{
                return (
                  <Checkbox 
                  icon={<RadioButtonUncheckedIcon style={{color:'grey'}}/>} checkedIcon={<RadioButtonCheckedRoundedIcon style={{color:'rgb(140, 255, 87)'}} />} value={1} 

                  checked={props.rowData.active==='true'?true:false} 

                  onChange={(e)=>{
                    props.onChange(e.target.checked ? 'true' : 'false' )
                }}/>
              )
            }
          }
        ]
      });
    
    useEffect(()=>{

        console.log('datasd');

        axios.get('http://localhost:3000/users',{
            headers: {Authorization: `Bearer ${localStorage.getItem('Token')}`}
        })
        .then(datas=>{

            let cdata = [];
            datas.data.map(ind=>{
                cdata.push({
                    id: ind.id,
                    username : ind.username,
                    firstname : ind.firstName,
                    lastname : ind.lastName,
                    email : ind.email,
                    active : ind.active ? 'true' : 'false',
                    password : ind.password
                })
            })
            setState({...state, data:cdata});
        })
        .catch(e=>{
            console.warn(e);
        })
    } , [])

  return (
    <MaterialTable
      title="User Management"
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
        selection: true,
        filtering: true
      }}
      
      actions={[
        {
          tooltip: 'Remove All Selected Users',
          icon: 'delete',
          onClick: (evt, data) => {
            data.map(udata=>{
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(udata), 1);
                return {...prevState, data}
              });
              DeleteData(udata.id)
            });
          }
        }
      ]}

      editable={{

        // onRowAdd: newData =>
        //   new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve();
        //       setState(prevState => {
        //         const data = [...prevState.data];
        //         data.push(newData);
        //         return { ...prevState, data };
        //       });
        //     }, 600);
        //   }),

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
          }).then(EditData(newData,oldData)),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600)
          }).then(DeleteData(oldData.id)),
      }}
    />
  );
}