import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import { VpnKey } from "@material-ui/icons";

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
  alert: {
    alignItems: "center",
  },
}));

function PasswordResetCompleted() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    new_password: "",
    re_new_password: "",
  });
  const [messages, setMessages] = React.useState(false);
  const [validation, setValidation] = React.useState({
    new_password: {
      error: false,
      helperText: "",
    },
    re_new_password: {
      error: false,
      helperText: "",
    },
  });

  const [reseted, setReseted] = React.useState(false);

  const setNewPassword = async () => {
    let path = window.location.pathname.split("/");
    let response = await fetch("/api/auth/users/reset_password_confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: path[path.length - 2],
        token: path[path.length - 1],
        new_password: state.new_password,
        re_new_password: state.re_new_password,
      }),
    });
    if (response.ok) {
      setReseted(true);
      setState({ new_password: "", re_new_password: "" });
    } else {
      let errors = await response.json();
      console.log(errors);
      if (
        Object.keys(errors).includes("uid") ||
        Object.keys(errors).includes("token")
      ) {
        setValidation({
          new_password: {
            error: false,
            helperText: "",
          },
          re_new_password: {
            error: false,
            helperText: "",
          },
        });
        setMessages(true);
      } else {
        let data = {};
        for (let error in errors) {
          console.log(error);
          if (errors.hasOwnProperty(error)) {
            data[error] = {
              error: true,
              helperText: errors[error].join(" "),
            };
          }
        }
        if (errors.non_field_errors !== undefined) {
          if (data.re_new_password === undefined)
            data.re_new_password = { helperText: "" };
          data.re_new_password.error = true;
          data.re_new_password.helperText += errors.non_field_errors.join(" ");
        }
        for (let s in state) {
          if (data[s] === undefined) {
            data[s] = { error: false, helperText: "" };
          }
        }
        setValidation(data);
      }
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="from-header" variant="h5" align="center">
            Reset Password
          </Typography>
          <Typography
            className={classes.form_text}
            align="center"
            variant="subtitle1"
          >
            Please enter your new password
          </Typography>
          <TextField
            error={"error" ? validation.new_password.error : ""}
            helperText={validation.new_password.helperText}
            name="new_password"
            value={state.new_password}
            onChange={handleChange}
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
            error={"error" ? validation.re_new_password.error : ""}
            helperText={validation.re_new_password.helperText}
            name="re_new_password"
            value={state.re_new_password}
            onChange={handleChange}
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
          {messages && (
            <Alert className={classes.alert} variant="filled" severity="error">
              Seems that your url is not valid! Try to{" "}
              <Link className={classes.form_link} to="/reset-password/">
                reset your password again
              </Link>
            </Alert>
          )}
          {reseted && (
            <Alert
              className={classes.alert}
              variant="filled"
              severity="success"
            >
              You successfully changed your password! Back to{" "}
              <Link className={classes.form_link} to="/login/">
                login page
              </Link>
            </Alert>
          )}
          <Button
            onClick={() => setNewPassword()}
            variant="contained"
            className={"form-button " + classes.button}
            size="medium"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PasswordResetCompleted;
