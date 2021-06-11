import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import PasswordResetSent from "./PasswordResetSent";
import PasswordResetCompleted from "./PasswordResetCompleted";
import UserActivationCompleted from "./UserActivationCompleted";
import UserActivationSent from "./UserActivationSent";
import List from "./List";
import { Route, BrowserRouter } from "react-router-dom";

function App(props) {
  const [tokens, setTokens] = useState({
    access: localStorage.getItem("access")
      ? localStorage.getItem("access")
      : "",
    refresh: localStorage.getItem("refresh")
      ? localStorage.getItem("refresh")
      : "",
  });
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let isMounted = false;
    const onCreate = async () => {
      if (await verifyTokens(tokens.access, tokens.refresh)) {
        setAuthed(true);
        await updateUsername();
      } else {
        setAuthed(false);
      }
    };
    if (!isMounted) {
      onCreate();
    }
    return () => {
      isMounted = true;
    };
  }, []);

  const _verifyToken = async (token) => {
    let response = await fetch("/api/auth/jwt/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    return response.ok;
  };

  const verifyTokens = async (access, refresh) => {
    if (await _verifyToken(access)) {
      return true;
    }
    if (await _verifyToken(refresh)) {
      await refreshAccessToken(refresh);
      return true;
    }
    return false;
  };

  const refreshAccessToken = async (refreshToken) => {
    let response = await fetch("/api/auth/jwt/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
    let data = await response.json();
    setTokens(data);
    localStorage.access = data.access;
    localStorage.refresh = data.refresh;
  };

  const updateUsername = async (access) => {
    if (!access) access = tokens.access;
    let response = await fetch("/api/auth/users/me/", {
      headers: {
        Authorization: "JWT " + access,
      },
    });
    if (response.ok) {
      let data = await response.json();
      setUsername(data.username);
    }
  };

  const updateTokens = async (access, refresh) => {
    if (await verifyTokens(access, refresh)) {
      setTokens({ access: access, refresh: refresh });
      localStorage.access = access;
      localStorage.refresh = refresh;
      await updateUsername(access);
      setAuthed(true);
    } else {
      setTokens({ access: access, refresh: refresh });
      localStorage.access = "";
      localStorage.refresh = "";
      setUsername("");
      setAuthed(false);
    }
  };

  return (
    <BrowserRouter>
      <CssBaseline>
        <Header
          position="static"
          isAuthenticated={authed}
          updateTokens={updateTokens}
        />
        <Route exact path="/" component={Home} />
        <Route
          condition={true}
          exact
          path="/list/"
          render={(props) => (
            <List
              {...props}
              isAuthenticated={authed}
              username={username}
              accessToken={tokens.access}
            />
          )}
        />
        <Route
          exact
          path="/login/"
          render={(props) => (
            <Login
              {...props}
              tokens={tokens}
              setTokens={updateTokens}
              authed={authed}
            />
          )}
        />
        <Route
          exact
          path="/register/"
          render={(props) => <Register {...props} isAuthenticated={authed} />}
        />
        <Route exact path="/activate/sent/" component={UserActivationSent} />
        <Route
          exact
          path="/activate/:uid/:token"
          component={UserActivationCompleted}
        />
        <Route
          exact
          path="/reset-password/sent/"
          component={PasswordResetSent}
        />
        <Route
          exact
          path="/reset-password/:uid/:token"
          component={PasswordResetCompleted}
        />
        <Route exact path="/reset-password/" component={PasswordReset} />
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;

const root = document.getElementById("root");
render(<App />, root);
