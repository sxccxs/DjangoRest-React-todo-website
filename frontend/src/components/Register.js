import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import { Person, VpnKey, Email } from "@material-ui/icons";
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
            Register Account
          </Typography>
          <TextField
            required={true}
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required={true}
            label="Email"
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required={true}
            label="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required={true}
            label="Confirm Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            className={"form-button " + classes.button}
            size="medium"
          >
            Register
          </Button>
          <Typography
            className={classes.form_text}
            align="center"
            variant="subtitle1"
          >
            Already have an account?{" "}
            <Link className={classes.form_link} to="/login/">
              Sign in!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
