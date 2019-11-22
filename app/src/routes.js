import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './components/Register/Register';
import MediaCard from './components/MediaCard';
import UserMan from './components/UserMan';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={MediaCard} exact />
            <Route path="/register" component={Register} />
            <Route path="/usermanager" component={UserMan} />
        </Switch>
    )
}