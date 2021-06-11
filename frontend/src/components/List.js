import { makeStyles } from "@material-ui/core/styles";
import Task from "./Task";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  card_container: {
    paddingLeft: "20rem !important",
    paddingRight: "20rem !important",
  },
  card: {
    minWidth: "41rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  card_header: {
    marginTop: ".5rem !important",
    marginBottom: "1rem !important",
  },
  input_label: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    maxHeight: "3.4rem",
    marginLeft: "1rem !important",
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  },
}));

function List(props) {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    let isMounted = false;
    const getList = async () => {
      let response = await fetch("/api/list/", {
        headers: {
          Authorization: "JWT " + props.accessToken,
        },
      });
      let data = await response.json();
      setTasks(data);
    };
    if (!isMounted) {
      getList();
    }
    return () => {
      isMounted = true;
    };
  }, []);

  const deleteTask = async (id) => {
    const requestParams = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + props.accessToken,
      },
    };
    let response = await fetch(`/api/list/${id}/`, requestParams);
    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const createTask = async () => {
    if (searchField !== "") {
      const requestParams = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + props.accessToken,
        },
        body: JSON.stringify({
          text: searchField,
        }),
      };
      let response = await fetch("/api/list/", requestParams);
      if (response.ok) {
        let data = await response.json();
        setTasks([data, ...tasks]);
        setSearchField("");
      }
    }
  };

  const updateTask = async (id, is_complited) => {
    const requestParams = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + props.accessToken,
      },
      body: JSON.stringify({
        is_complited: !is_complited,
      }),
    };
    let response = await fetch(`/api/list/${id}/`, requestParams);
    if (response.ok) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, is_complited: !is_complited } : task
        )
      );
    }
  };

  function handleChange(e) {
    setSearchField(e.target.value);
  }

  if (!props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={"card-container " + classes.card_container}>
      <Card className={"card " + classes.card} variant="outlined">
        <CardContent className="card-content">
          <Typography
            className={classes.card_header}
            variant="subtitle1"
            align="left"
          >
            Welcome,{" "}
            {props.username.charAt(0).toUpperCase() + props.username.slice(1)}{" "}
            !!!
          </Typography>
          <div className={classes.input_label}>
            <TextField
              value={searchField}
              onChange={handleChange}
              name="searchField"
              className={classes.input}
              label="What do you need today?"
            />

            <Button
              onClick={createTask}
              className={classes.button}
              variant="contained"
              size="medium"
            >
              Add
            </Button>
          </div>
          <div className="">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggle={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default List;
