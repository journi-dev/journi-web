import React from "react";
import { Navigate, Route } from "react-router-dom";

export default function AuthRoute({ authenticated, ...props }) {
  return (
    <Route exact {...props}>
      {authenticated && <Navigate to={authenticated ? "/home" : "/welcome"} />}
    </Route>
  );
}
