import React from "react";
import LoggedOutLayout from "./LoggedOutLayout";
import LoggedInLayout from "./LoggedInLayout";
import { Outlet } from "react-router-dom";

export default function Layout({ authenticated }) {
  return (
    <div>
      {authenticated ? (
        <LoggedInLayout>
          <Outlet />
        </LoggedInLayout>
      ) : (
        <LoggedOutLayout>
          <Outlet />
        </LoggedOutLayout>
      )}
    </div>
  );
}
