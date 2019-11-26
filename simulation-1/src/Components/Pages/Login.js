import React,{useState, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import GettingData,{LoggingIn, StoreData} from '../API/GettingData';
 
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

   const login = (e) => {

        console.log('loggin in');

        LoggingIn(userData)
        .then(res=>{
            localStorage.setItem('Token', res.data.accessToken);
            setToken(res.data.accessToken)

            //Store users data
            StoreData(userData);

        })
        .catch(error=>{
            alert('User account not avaible,');
            e.preventDefault();
        })
        e.preventDefault();
    }

    if(localStorage.getItem('Token')){
        return <Redirect to='/usermanagement'/>
    }

    return (
        <Fragment>

            <div className='c-login-overlay'/>
            
            <div className='c-login-container'>
            <h3>Hello!<span> Sign in to continue</span></h3>
            <ValidatorForm 
                // ref="form"
                className='c-inputs-container'   autoComplete='off'
                onSubmit={login}
                onError={errors => console.log(errors)}>

                <TextValidator
                    required
                    id='outlined-required'
                    label='Email'
                    // defaultValue='Email'
                    margin='normal'
                    variant='outlined'
                    // className='mat-ui-input'
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='email'
                    value={userData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'Invalid email format']}
                />

                <TextValidator
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    className='c-login-inputs' 
                    onChange={eventChecker}
                    name='password'
                />

                <Button
                    className='c-login-button'
                    variant='contained' color='primary'
                    type='submit'
                    label='Login'>
                        Log In
                </Button>

                <div className='c-create-account-container'>
                    <p>Need an account ?</p>
                    <Link className='c-signup-button'  to='/signup'>Sign Up</Link>
                </div>
            </ValidatorForm>
        </div>
        </Fragment>
    )
}
