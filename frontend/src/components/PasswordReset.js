import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import { Email } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  },
  form_input: {
    marginTop: "1rem !important",
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="from-header" variant="h5" align="center">
            Reset Password
          </Typography>
          <Typography align="center" variant="subtitle2">
            Enter your email address below, and we'll email instructions for
            setting a new password.
          </Typography>
          <TextField
            className={classes.form_input}
            required={true}
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            className={"form-button " + classes.button}
            size="medium"
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
