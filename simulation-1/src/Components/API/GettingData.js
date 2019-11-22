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
