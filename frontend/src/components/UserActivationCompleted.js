import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  },
  form_link: {
    textDecoration: "underline",
  },
  form_text: {
    marginBottom: "1rem !important",
  },
  form_text_last: {
    marginTop: "1rem !important",
  },
}));

function UserActivationCompleted() {
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
          <Typography className="from-header" variant="h5" align="center">
            Account Activation
          </Typography>
          <Typography
            className={classes.form_text}
            align="center"
            variant="subtitle1"
          >
            You successfully activated your account!
          </Typography>
          <Typography
            className={classes.form_text_last}
            align="center"
            variant="subtitle1"
          >
            Back to{" "}
            <Link className={classes.form_link} to="/login/">
              Login page
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserActivationCompleted;
