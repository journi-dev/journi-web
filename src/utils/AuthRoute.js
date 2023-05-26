import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function AuthRoute({ authenticated, ...props }) {
  return (
    <Route exact {...props}>
      {authenticated && <Redirect to={authenticated ? "/home" : "/welcome"} />}
    </Route>
  );
}
