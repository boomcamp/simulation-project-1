import React,{useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'


import UserTable3 from './UserTable3';
import GettingData from '../API/GettingData';

import DashBoard from './Dashboard';


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
            
            <DashBoard />
            <div className='TableContainer'>
                <UserTable3 />
            </div>
        </section>
    )
}
