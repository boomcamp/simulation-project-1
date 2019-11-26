import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import ManageUser from "./components/manage-user";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/manage-user" component={ManageUser} />
    </BrowserRouter>
  );
}
