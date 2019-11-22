import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'


export default function SignUp() {

    const [userData, setuserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        active: true
    });

    const [repassword, setRePassword] = useState('');

    function eventChecker(e){

        if(e.target.name === 'repassword'){
            return setRePassword(e.target.value)
        }

        let prevData = Object.assign({},userData);
        
        prevData[e.target.name]= e.target.value;

        setuserData(prevData);
    }

    function submitRegister(e){

        if(userData.password !== repassword){
            alert('password dont match');
            e.preventDefault();
            return null;
        }

        axios.post('http://localhost:3000/register',{
                "email" :  userData.email,
                "password" : userData.password.toString(),
                "plainPassword" : userData.password,
                "username": userData.username,
                "firstName": userData.firstName,
                "lastName": userData.lastName,
                "active": true
            }).then(res=>{
            console.log(res.data.accessToken);
            //store
            localStorage.setItem('Token', res.data.accessToken);
        })
        .catch(e=>{
            console.log(e);
        })

        // e.preventDefault();
    }

    return (
        <div className='c-signup-container'>
            <h1>SIGN UP</h1>
            <form className='c-inputs-container'>
                
                <input required name='username' className='c-login-inputs' type='text' placeholder='Username' onChange={eventChecker}/>

                <input required name='firstName' className='c-login-inputs' type='text' placeholder='First Name' onChange={eventChecker}/>

                <input required required name='lastName' className='c-login-inputs' type='text' placeholder='Last Name' onChange={eventChecker}/>

                <input required name='email' className='c-login-inputs' type='text' 
                placeholder='Email' onChange={eventChecker}/>


                <input required name='password' className='c-login-inputs' type='password' 
                placeholder='Password' onChange={eventChecker}/>

                <input required name='repassword' className='c-login-inputs' type='password' 
                placeholder='Confirm Password' onChange={eventChecker}/>

                <input required className='c-login-button c-login-inputs' type='submit' placeholder='Submit' onClick={submitRegister}/>
                
                <Link className='c-login-button c-login-inputs' to='/'>&lt;Back</Link>

            </form>
        </div>
    )
}
