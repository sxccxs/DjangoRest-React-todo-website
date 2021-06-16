import useStyles from "./styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserActivationCompleted() {
  // TODO: define behavior for errors
  const classes = useStyles();

  const [activated, setActivated] = useState(() => {
    let path = window.location.pathname.split("/");
    fetch("/api/auth/users/activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: path[path.length - 2],
        token: path[path.length - 1],
      }),
    }).then((response) => response.ok);
  });

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="form-header" variant="h5" align="center">
            Account Activation
          </Typography>
          <Typography
            className={classes.card_text}
            align="center"
            variant="subtitle1"
          >
            You successfully activated your account!
          </Typography>
          <Typography
            className={classes.card_text_last}
            align="center"
            variant="subtitle1"
          >
            Back to{" "}
            <Link className={classes.card_link} to="/login/">
              Login page
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserActivationCompleted;
