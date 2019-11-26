import React,{useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'


import UserTable3 from './UserTable3';
import GettingData from '../API/GettingData';

export default function UserManagement() {

    const [userName, setUserName] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            setUserName(localStorage.getItem('Name'));
        },1000)
        
    },[])

    if(!localStorage.getItem('Token')){
        return <Redirect to='/'/>
    }

    return (
        <section>
            <div className='HeaderContainer'>
                <div className='logo-container'>
                    <img className='logo'/>

                    LOGO

                </div>

                {/* <div className='user-header-container'> */}

    <div> Hello,'{userName}' </div>
                    {/* <div> Activity Log </div>                */}
                {/* </div> */}
            </div>

            <div className='TableContainer'>
                <UserTable3/>
            </div>
        </section>
    )
}
