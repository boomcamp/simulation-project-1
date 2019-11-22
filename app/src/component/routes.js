import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Login from './login/login';
export class routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={Login}/>
            </Switch>
        )
    }
}

export default routes
