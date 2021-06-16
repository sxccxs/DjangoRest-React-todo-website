import useStyles from "./styles";
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
import { Redirect } from "react-router-dom";

function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [valid, setValid] = React.useState({
    error: false,
    helperText: "",
  });
  const [reseted, setReseted] = React.useState(false);

  const resetPassword = async () => {
    let response = await fetch("/api/auth/users/reset_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (response.ok) {
      setReseted(true);
    } else {
      let errors = await response.json();
      console.log(errors);
      if (Array.isArray(errors)) {
        setValid({
          error: true,
          helperText: errors.join(" "),
        });
      } else {
        setValid({
          error: true,
          helperText: errors.email.join(" "),
        });
      }
    }
  };

  function handleChange(e) {
    setEmail(e.target.value);
  }
  if (reseted) {
    return <Redirect to="/reset-password/sent/" />;
  }

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="form-header" variant="h5" align="center">
            Reset Password
          </Typography>
          <Typography align="center" variant="subtitle2">
            Enter your email address below, and we'll email you instructions for
            setting a new password.
          </Typography>
          <TextField
            error={"error" ? valid.error : ""}
            helperText={valid.helperText}
            className={classes.form_input}
            required={true}
            value={email}
            name="email"
            onChange={handleChange}
            label="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={() => resetPassword()}
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
