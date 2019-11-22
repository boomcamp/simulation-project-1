import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';


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
  },{ 
    headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } 
    })
  .then(data=>console.log(data))
  .catch(e=>console.log(e));
}

export default function UserTable3() {

    const [rowdata ,  setRowData] = useState([]);

    const [state, setState] = React.useState({
        columns: [
          {title: 'User Name', field: 'username'},
          {title: 'First Name', field: 'firstname' },
          {title: 'Last Name', field: 'lastname' },
          {title: 'Email', field: 'email'},
          {title: 'Active', field: 'active', cellStyle : {
            maxWidth: '10px'
          }}
          
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
                    active : ind.active ? <div className='active-icon'/> : <div className='inactive-icon'/> 
                })

            })

            setState({...state, data:cdata});
        })
        .catch(e=>{
            console.warn(e);
        })
    }, [])

  return (
    <MaterialTable
      title="User Management"
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1
      }}
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