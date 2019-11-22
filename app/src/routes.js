import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Users from "./components/Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      handleLogin,
      handleOnChange,
      handleSignUp,
      accessToken,
      handleLogout,
      regSuccess
    } = this.props;

    return (
      <Switch>
        <Route
          exact
          render={() =>
            accessToken ? (
              <Users handleLogout={handleLogout} />
            ) : (
              <Login
                handleOnChange={handleOnChange}
                handleLogin={handleLogin}
              />
            )
          }
          path="/"
        />
        <Route
          render={() =>
            regSuccess ? (
              <Redirect from="*" to="/" />
            ) : (
              <Registration
                handleOnChange={handleOnChange}
                handleSignUp={handleSignUp}
              />
            )
          }
          path="/register"
        />
      </Switch>
    );
  }
}
