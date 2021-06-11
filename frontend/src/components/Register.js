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
import { Link, Redirect } from "react-router-dom";

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

function Register(props) {
  const classes = useStyles();
  const [registered, setRegistered] = React.useState(false);
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [validation, setValidation] = React.useState({
    username: {
      error: false,
      helperText: "",
    },
    email: {
      error: false,
      helperText: "",
    },
    password: {
      error: false,
      helperText: "",
    },
    re_password: {
      error: false,
      helperText: "",
    },
  });

  const register = async () => {
    let response = await fetch("/api/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        username: state.username,
        password: state.password,
        re_password: state.re_password,
      }),
    });
    if (response.ok) {
      setRegistered(true);
    } else {
      let errors = await response.json();
      let data = {};
      for (let error in errors) {
        if (errors.hasOwnProperty(error)) {
          data[error] = {
            error: true,
            helperText: errors[error].join(" "),
          };
        }
      }
      if (errors.non_field_errors !== undefined) {
        if (data.re_password === undefined)
          data.re_password = { helperText: "" };
        data.re_password.error = true;
        data.re_password.helperText += errors.non_field_errors.join(" ");
      }
      for (let s in state) {
        if (data[s] === undefined) {
          data[s] = { error: false, helperText: "" };
        }
      }

      setValidation(data);
      setState({ ...state, password: "", re_password: "" });
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (registered) {
    return <Redirect to="/activate/sent/" />;
  }
  if (props.isAuthenticated) {
    return <Redirect to="/list/" />;
  }
  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="from-header" variant="h5" align="center">
            Register Account
          </Typography>
          <TextField
            error={"error" ? validation.username.error : ""}
            helperText={validation.username.helperText}
            name="username"
            value={state.username}
            onChange={handleChange}
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
            error={"error" ? validation.email.error : ""}
            helperText={validation.email.helperText}
            name="email"
            value={state.email}
            onChange={handleChange}
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
            error={"error" ? validation.password.error : ""}
            helperText={validation.password.helperText}
            name="password"
            value={state.password}
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
            error={"error" ? validation.re_password.error : ""}
            helperText={validation.re_password.helperText}
            name="re_password"
            value={state.re_password}
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
          <Button
            onClick={register}
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

export default Register;
