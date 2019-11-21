import React from "react";
import { Switch, Route,BrowserRouter } from "react-router-dom";
import Register from "./components/register";

export default function Routes() {
    return (
    <BrowserRouter>

        <Route exact component={Register} path="/" />
        {/* <Route path="/location/:path+" component={ props => <Location id={props.match.params.path} />} />
        <Route path="/area/:path+" component={ props => <Area id={props.match.params.path} />} />
        <Route path="/capture/:path+" component={ props => <Captured id={props.match.params.path} />} /> */}
 
    </BrowserRouter>
    );
  }