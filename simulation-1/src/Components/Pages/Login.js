import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

export default function Login() {

    const [userData, setUserData] = useState({
            email: '',
            password: ''
    });
    
    const [token, setToken] = useState('');

    function eventChecker(e){
        let prevData = Object.assign({}, userData);
        prevData[e.target.name] = e.target.value;
        setUserData(prevData);
    }

    function login(e){


        axios.post('http://localhost:3000/login',
            {
                "email" : userData.email,
                "password" : userData.password
            }
        )
        .then(res=>{
            console.log(res.data.accessToken)
            localStorage.setItem('Token', res.data.accessToken);
            setToken(res.data.accessToken)

            axios.get(`http://localhost:3000/users?q=${userData.email}`,{ 
                headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` } 
            }).then(res=>{
                localStorage.setItem('Name', res.data[0].firstName)
            }).catch(e=>{
                console.log(e);
            })
        })
        .catch(e=>{
            console.log(e)
        })
        
        e.preventDefault();
    }

    if(localStorage.getItem('Token')){
        console.log('sa');
        return <Redirect to='/usermanagement'/>
    }

    return (
        <div className='c-login-container'>
            <h1>LOGIN</h1>
            <form className='c-inputs-container'>
                
                <input required name='email' className='c-login-inputs' type='text' placeholder='email' onChange={eventChecker}/>
                <input required name='password' className='c-login-inputs' type='password' 
                placeholder='Password'onChange={eventChecker}/>

                <input type='submit' className='c-login-button c-login-inputs' onClick={login} value='Login' />

                <Link className='c-login-button c-login-inputs' to='/signup'>Sign Up</Link>
            </form>


        </div>
    )
}
