import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ManageUser from "./components/ManageUsers";
import Error from "./components/includes/Page404";
import ReactNotifications from "react-notifications-component";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<ReactNotifications />
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/manageusers" component={ManageUser} />
				<Route component={Error} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
