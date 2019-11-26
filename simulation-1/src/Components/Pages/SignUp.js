import React,{useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {RSignUp} from '../API/GettingData';


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

    useEffect(() => {

        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {

            if (value !== userData.password) {
                return false;
            }

            return true;
        });
        
        ValidatorForm.addValidationRule('lengthText', (value) => {

            if (value.length < 6 && value.length !== 0) {
                return false;
            }

            return true;
        });
    })

    function eventChecker(e){

        if(e.target.name === 'repassword'){
            return setRePassword(e.target.value)
        }

        let prevData = Object.assign({},userData);
        
        prevData[e.target.name]= e.target.value;

        setuserData(prevData);
    }

    function Register(e){

        e.preventDefault();

        // console.log(userData);

        if(userData.password !== repassword){
            alert('password dont match');
            e.preventDefault();
            return null;
        }

        RSignUp().then(res=>{

            console.log(res.data.accessToken);
            //store

            localStorage.setItem('Login', true);

            alert('logging in');

            e.preventDefault();

            setTimeout(()=>{
                setuserData('');
            },{});
            
        })
        .catch(e=>{
            console.log(e);
        })

    }

    if(localStorage.getItem('Login')){
        alert('Redirecting to Login Page');
        localStorage.removeItem('Login');
        return <Redirect to='/'/>
    }else{
        console.log('checking for login token');
    }

    return (
        <div className='c-signup-container c-login-container'>
            <p>Kindly provide the data to register</p>
            <ValidatorForm 
                className='c-inputs-container' autoComplete='off'
                onSubmit={Register}
                onError={errors => console.log(errors)}>

                <TextValidator
                    required
                    id='outlined-required'
                    label='User Name'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' asdasdasdasadasdasd12312312312
                    onChange={eventChecker}
                    name='username'
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={userData.username}
                />

                <TextValidator
                    required
                    id='outlined-required'
                    label='First Name'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='firstName'
                    validators={['required', 'matchRegexp:^[a-zA-Z]*$']}
                    errorMessages={['this field is required', 'Kindly input proper text']}
                    value={userData.firstName}
                />

                <TextValidator
                    required
                    id='outlined-required'
                    label='Last Name'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='lastName'

                    validators={['required', 'matchRegexp:^[a-zA-Z]*$']}

                    errorMessages={['this field is required', 'Kindly input proper text']}

                    value={userData.lastName}
                />

                <TextValidator
                    required
                    id='outlined-required'
                    label='Email'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='email'
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'Invalid email format']}
                    value={userData.email}
                />

                <TextValidator
                    required
                    id='outlined-required'
                    label='Password'
                    type='password'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='password'
                    validators={['required', 'lengthText']}
                    errorMessages={['this field is required', 'password too short']}
                    value={userData.password}
                />

                <TextValidator
                    required
                    id='outlined-required'
                    label='Confirm Password'
                    type='password'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='repassword'
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['this field is required', 'Password dont Match']}
                    value={repassword}
                />

                <Button
                    className='c-login-button'
                    variant='contained' color='primary'
                    type='submit'
                    label='Login'>
                        Register
                </Button>
                
                <Link className='c-signup-button' to='/'>&lt; Go back to log in</Link>

            </ValidatorForm>
        </div>
    )
}
