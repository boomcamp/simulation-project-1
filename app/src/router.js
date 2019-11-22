import React from 'react'
import {Route, Switch} from 'react-router-dom'

import LoginPage from './LoginPage/login'
import Registration from './Registration/registration'
import ManageUser from './ManageUser/manage'
export default function Routes(){
    return(
        <Switch>
            <Route exact component={LoginPage} path='/' />
            <Route component={Registration} path='/registration'/>
            <Route component={ManageUser} path='/manageuser' />
        </Switch>
    )
}