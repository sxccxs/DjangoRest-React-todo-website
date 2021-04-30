import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import { Person, VpnKey } from "@material-ui/icons";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import getCookie from "./utils";

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

function Login(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    username: "",
    password: "",
  });

  async function login() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    };
    let responce = await fetch("/api/auth/login/", requestOptions);
    if (responce.ok) {
      props.authenticate(true);
    }
  }

  function _handleChange(e) {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  if (!props.isAuthenticated) {
    return (
      <div className="form-container">
        {console.log(props.isAuthenticated)}
        <Card className={"form " + classes.card}>
          <CardContent className="form-content">
            <Typography className="from-header" variant="h5" align="center">
              Login
            </Typography>
            <TextField
              name="username"
              required={true}
              value={state.username}
              onChange={_handleChange}
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
              name="password"
              required={true}
              value={state.password}
              onChange={_handleChange}
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
            <Button
              onClick={login}
              variant="contained"
              className={"form-button " + classes.button}
              size="medium"
            >
              Submit
            </Button>
            <Typography
              className={classes.form_text}
              align="center"
              variant="subtitle1"
            >
              <Link className={classes.form_link} to="/reset-password/">
                Forgot password?
              </Link>
            </Typography>
            <Typography
              className={classes.form_text}
              align="center"
              variant="subtitle1"
            >
              Don't have an account?{" "}
              <Link className={classes.form_link} to="/register/">
                Sign Up Now!
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <Redirect to="/list/" />;
  }
}

export default Login;
