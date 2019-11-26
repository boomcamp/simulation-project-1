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
      handleLogOut,
      confirmed,
      handleConfirmPassword,
      redirect,
      errMsg,
      error,
      errorEmail,
      errorEmailMsg,
      handleRedirect,
      showPassword,
      handleShowPassword
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
                handleRedirect={handleRedirect}
              />
            ) : (
              <Users handleLogOut={handleLogOut} token={token} />
            )
          }
          path="/"
        />
        {redirect ? (
          <Redirect from="*" to="/" />
        ) : (
          <Route
            path="/register"
            render={() => (
              <Register
                handleOnChange={handleOnChange}
                handleSignUp={handleSignUp}
                confirmed={confirmed}
                handleConfirmPassword={handleConfirmPassword}
                errMsg={errMsg}
                error={error}
                errorEmail={errorEmail}
                errorEmailMsg={errorEmailMsg}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
              />
            )}
          />
        )}
      </Switch>
    );
  }
}
