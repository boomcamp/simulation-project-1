import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';


import Register from './Register'
import Login from './Login';
import ManageUsers from './ManageUsers';

export default function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route component={Login} exact path="/" />
                <Route component={Register} path="/register" />
                <Route component={ManageUsers} path="/manage" />
            </Switch>
        </HashRouter>
    );
}