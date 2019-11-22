import React from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ManageUser from "./components/ManageUser/ManageUser";

import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={Register} />
          <Route path="/manage" component={ManageUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
