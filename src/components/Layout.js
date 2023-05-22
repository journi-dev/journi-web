import React from "react";
import LoggedOutLayout from "./LoggedOutLayout";
import LoggedInLayout from "./LoggedInLayout";

export default function Layout({ authenticated, children }) {
  return (
    <div>
      {authenticated ? (
        <LoggedInLayout>{children}</LoggedInLayout>
      ) : (
        <LoggedOutLayout>{children}</LoggedOutLayout>
      )}
    </div>
  );
}
