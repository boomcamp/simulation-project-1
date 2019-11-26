import React, { Fragment, useState} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import ProfileBar from './ProfileBar';

export default function Dashboard() {

    const [isActive, setActive] = useState(false);


    const showOther = () =>{

        console.log('showing dash' + isActive);
        setActive(!isActive);

    }

    return (
        <Fragment>
            <div className='dashboard-container'>
                <AccountCircleIcon className='account-icon' onClick={showOther}/>
            </div>
            {
                isActive ? <ProfileBar name={localStorage.getItem('Name')} email={localStorage.getItem('Email')} showOther={showOther}/> : ''
            
            }
            
            
        </Fragment>
    )
}
