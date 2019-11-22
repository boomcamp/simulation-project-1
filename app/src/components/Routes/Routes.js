import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Users from "../Users/Users";

export default class Routes extends React.Component {
  render() {
    const {
      token,
      handleOnChange,
      handleLogin,
      handleSignUp,
      handleLogOut
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          render={() =>
            token === null ? (
              <Login
                handleOnChange={handleOnChange}
                handleLogin={handleLogin}
              />
            ) : (
              <Users handleLogOut={handleLogOut} token={token} />
            )
          }
          path="/"
        />
        <Route
          path="/register"
          render={() => (
            <Register
              handleOnChange={handleOnChange}
              handleSignUp={handleSignUp}
            />
          )}
        />
      </Switch>
    );
  }
}
