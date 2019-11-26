import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Header() {
    const [name, setName]  = useState();

    useEffect(() => {
        axios
        .get(`http://localhost:3000/users?email=${localStorage.getItem('user')}`, { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        })
        .then(res => {
            setName(res.data[0].firstName +' '+res.data[0].lastName)
        })
    }, [])

    return (
        <div className="header">
            <h1 className="headerTitle"> Simulation Project 1 </h1>

            <div className="dropdown">
                <button className="drpbtn"><i className="material-icons account_circle">account_circle</i>▼</button>
                <div className="drpcontent">
                    <a href="#user">{name} </a>
                    <a href="#home" style={{color:`red`}} onClick={ () => {localStorage.removeItem("token"); localStorage.removeItem("user")} }>Logout</a>
                </div>
            </div>
        </div>
    )
}
