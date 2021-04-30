import React from "react";
import { render } from "react-dom";
import { CssBaseline } from "@material-ui/core";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PasswordReset from "./PasswordReset";
import PasswordResetDone from "./PasswordResetDone";
import List from "./List";
import PrivateRoute from "./PrivateRoute";
import { Route, BrowserRouter } from "react-router-dom";

function App(props) {
  const [state, setState] = React.useState(isAuthenticated);

  async function isAuthenticated() {
    let responce = await fetch("/api/auth/is-authenticated");
    return responce.json.is_authenticated;
  }

  return (
    <BrowserRouter>
      <CssBaseline>
        <Header position="static" isAuthenticated={state} />
        <Route exact path="/" component={Home} />
        <Route path="/list/" component={List} />
        <Route
          path="/login/"
          render={(props) => (
            <Login {...props} isAuthenticated={state} authenticate={setState} />
          )}
        />
        <Route path="/register/" component={Register} />
        <Route path="/reset-password/done/" component={PasswordResetDone} />
        <Route path="/reset-password/" component={PasswordReset} />
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;

const root = document.getElementById("root");
render(<App />, root);
