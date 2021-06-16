import useStyles from "./styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function PasswordResetSent() {
  const classes = useStyles();

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="form-header" variant="h5" align="center">
            Reset Password
          </Typography>
          <Typography
            className={classes.card_text}
            align="center"
            variant="subtitle1"
          >
            Check your inbox
          </Typography>
          <Typography
            className={classes.card_text}
            align="center"
            variant="subtitle1"
          >
            We've emailed you instructions for setting your password. You should
            receive the email shortly!
          </Typography>
          <Typography
            className={classes.card_text_last}
            align="center"
            variant="subtitle1"
          >
            Back{" "}
            <Link className={classes.card_link} to="/">
              home
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PasswordResetSent;
