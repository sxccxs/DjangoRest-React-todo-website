import React from "react";

export default function PrivateRoute({
  component: Component,
  authed,
  condition,
  redirectPath,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === condition ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: redirectPath, state: { from: props.location } }}
          />
        )
      }
    />
  );
}
