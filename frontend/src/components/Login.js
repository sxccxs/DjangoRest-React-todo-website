import useStyles from "./styles";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import { Person, VpnKey } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React from "react";
import { Link, Redirect } from "react-router-dom";

function Login(props) {
  const classes = useStyles();
  console.log(classes.button);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = React.useState(false);

  const [validation, setValidation] = React.useState({
    password: {
      error: false,
      helperText: "",
    },
    email: {
      error: false,
      helperText: "",
    },
  });

  async function login() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    };
    let response = await fetch("/api/auth/jwt/create/", requestOptions);
    let json = await response.json();
    if (response.ok) {
      await props.setTokens(json.access, json.refresh);
    } else {
      if (Object.keys(json).includes("detail")) {
        setMessage(true);
      } else {
        let data = {};
        for (let error in json) {
          if (json.hasOwnProperty(error)) {
            data[error] = {
              error: true,
              helperText: json[error].join(" "),
            };
          }
        }
        for (let s in state) {
          if (data[s] === undefined) {
            data[s] = { error: false, helperText: "" };
          }
        }
        setValidation(data);
      }
      setState({ ...state, password: "" });
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  if (props.authed) {
    return <Redirect to="/list/" />;
  }

  return (
    <div className="form-container">
      <Card className={"form " + classes.card}>
        <CardContent className="form-content">
          <Typography className="form-header" variant="h5" align="center">
            Login
          </Typography>
          <TextField
            error={"error" ? validation.email.error : ""}
            helperText={validation.email.helperText}
            name="email"
            required={true}
            value={state.email}
            onChange={handleChange}
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            error={"error" ? validation.password.error : ""}
            helperText={validation.password.helperText}
            name="password"
            required={true}
            value={state.password}
            onChange={handleChange}
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
          {message && (
            <Alert
              className={classes.alert}
              variant="filled"
              severity="warning"
            >
              Email or password is incorrect!
            </Alert>
          )}
          <Button
            onClick={() => login()}
            variant="contained"
            className={"form-button " + classes.button}
            size="medium"
          >
            Submit
          </Button>
          <Typography
            className={classes.card_text}
            align="center"
            variant="subtitle1"
          >
            <Link className={classes.card_link} to="/reset-password/">
              Forgot password?
            </Link>
          </Typography>
          <Typography
            className={classes.card_text}
            align="center"
            variant="subtitle1"
          >
            Don't have an account?{" "}
            <Link className={classes.card_link} to="/register/">
              Sign Up Now!
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
