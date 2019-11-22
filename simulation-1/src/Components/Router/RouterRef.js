import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import SignUp from '../Pages/SignUp'
import Login from '../Pages/Login'
import UserManagement from '../Pages/UserManagement'

export default function RouterRef() {
    return (
        <Switch>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/' exact component={Login} />
            <Route path='/usermanagement' component={UserManagement} />
        </Switch>
    )
}
