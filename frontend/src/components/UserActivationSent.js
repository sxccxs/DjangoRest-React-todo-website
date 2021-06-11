import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
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

function UserActivationSent() {
  const classes = useStyles();

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
            Check your inbox
          </Typography>
          <Typography
            className={classes.form_text}
            align="center"
            variant="subtitle1"
          >
            We've emailed you instructions for activating your account. You
            should receive the email shortly!
          </Typography>
          <Typography
            className={classes.form_text_last}
            align="center"
            variant="subtitle1"
          >
            Back{" "}
            <Link className={classes.form_link} to="/">
              home
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserActivationSent;
