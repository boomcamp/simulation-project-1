import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import UserManage from "./components/UserManage/UserManage";

export default function Routes() {
  return (
    <div>
      <Router>
        {" "}
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route component={Register} path="/register" />
          <Route component={UserManage} path="/usermanage" />
        </Switch>
      </Router>
    </div>
  );
}
