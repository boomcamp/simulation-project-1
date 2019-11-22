import React, { Component } from 'react'
import Nav from './component/header/header';
import Login from './component/login/login';
import Register from './component/register/register';
import Management from './component/management/management';
import { HashRouter, Route, Switch } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
export class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/management" component={Management} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
