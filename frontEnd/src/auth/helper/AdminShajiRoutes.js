import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isShajiAutheticated } from "./index";

const AdminShajiRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isShajiAutheticated() && isShajiAutheticated().role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AdminShajiRoute;
