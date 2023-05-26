import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function AuthRoute({ children, authenticated, ...props }) {
  return (
    <Route {...props}>{authenticated ? <Redirect to="/" /> : children}</Route>
  );
}
