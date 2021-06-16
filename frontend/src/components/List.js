import useStyles from "./styles";
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
    <div className="card-container-list">
      <Card className={"card card-list " + classes.card} variant="outlined">
        <CardContent className="card-content">
          <Typography
            className="form-header-list"
            variant="subtitle1"
            align="left"
          >
            Welcome,{" "}
            {props.username.charAt(0).toUpperCase() + props.username.slice(1)}{" "}
            !!!
          </Typography>
          <div className="card-input-list">
            <TextField
              value={searchField}
              onChange={handleChange}
              name="searchField"
              className="card-input-field-list"
              label="What do you need today?"
            />

            <Button
              onClick={createTask}
              className={"card-button-list " + classes.button}
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
