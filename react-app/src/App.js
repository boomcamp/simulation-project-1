import React, { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ManageUser from "./components/ManageUser/ManageUser";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";

function App() {
  const [redirect, setRedirect] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        {redirect || localStorage.getItem("Token") ? (
          <Redirect to="/manage" />
        ) : null}

        <Switch>
          <Route
            exact
            path="/"
            render={props => <SignIn setRedirect={setRedirect} />}
          />
          <Route
            path="/login"
            render={props => <SignIn setRedirect={setRedirect} />}
          />
          <Route path="/register" component={Register} />

          <Route path="/manage" component={ManageUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
