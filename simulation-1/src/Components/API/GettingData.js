import axios from 'axios'

export default function GettingData(location) {
    return axios.get('http://localhost:3000/users',{
        Authorization: `Bearer ${localStorage.getItem('Token')}`
    })
    .then(data=>{
        return data;
    })
    .catch(e=>{
        console.log(e);
    })
}


export function LoggingIn(userData){
    return axios.post('http://localhost:3000/login',
            {
                "email" : userData.email,
                "password" : userData.password
            }
            ).then(data=>{
                return data;
            })
            .catch(e=>{
                console.log(e);
            })
}

export function StoreData(userData){
    return  axios.get(`http://localhost:3000/users?q=${userData.email}`,{ 
                headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } 
            }).then(res=>{
                localStorage.setItem('Name', `${res.data[0].firstName} ${res.data[0].lastName}`);
                localStorage.setItem('Email', `${res.data[0].email}`);
            }).catch(e=>{
                console.log(e);
            })
}

export function RSignUp(userData){
    axios.post('http://localhost:3000/register',{
                "email" :  userData.email,
                "password" : userData.password.toString(),
                "plainPassword" : userData.password.toString(),
                "username": userData.username,
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "active": true
            }
            ).then(data=>{
                return data;
            })
            .catch(e=>{
                console.log(e);
            })
}