import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  headerImage: {
    maxHeight: "3rem",
    marginRight: "1rem",
  },
  title_link: {
    flexGrow: 1,
  },
  toolbar: {
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
  },
  menu: {
    display: "flex",
    justifyContent: "space-between",
  },
  menu_item: {
    margin: "0 1.2rem",
  },
  logout: {
    cursor: "pointer",
  },
}));

function Header(props) {
  const classes = useStyles();

  const logout = () => {
    props.updateTokens("", "");
  };

  return (
    <div className={classes.header}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <img
              className={classes.headerImage}
              src="/static/images/favicon.png"
              alt="todoapp todo todolist"
            />
          </Link>
          <Typography className={classes.title_link} variant="h4">
            <Link to="/">To Do App</Link>
          </Typography>
          <div className={classes.menu}>
            <Typography className={classes.menu_item} variant="h6">
              <Link to="/">Home</Link>
            </Typography>
            {props.isAuthenticated ? (
              <>
                <Typography className={classes.menu_item} variant="h6">
                  <Link to="/list/">To Do List</Link>
                </Typography>
                <Typography
                  onClick={logout}
                  className={classes.menu_item + " " + classes.logout}
                  variant="h6"
                >
                  Logout
                </Typography>
              </>
            ) : (
              <Typography className={classes.menu_item} variant="h6">
                <Link to="/login/">Sign in</Link>
              </Typography>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
