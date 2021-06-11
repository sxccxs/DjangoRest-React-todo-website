import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  task: {
    display: "flex",
    "& :last-child": {
      marginLeft: "auto",
    },
    alignItems: "center",
    cursor: "pointer",
  },
  checkbox: {
    color: theme.palette.success.light + " !important",
  },
  cross: {
    color: "white !important",
  },
  task_date: {
    fontSize: ".75rem",
  },
  task_labels: {
    display: "flex",
    flexDirection: "column",
  },
  labels: {
    "user-select": "none",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-khtml-user-select": "none",
    "-ms-user-select": "none",
  },
}));

function Task(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.task}
      onDoubleClick={() =>
        props.onToggle(props.task.id, props.task.is_complited)
      }
    >
      <FormControlLabel
        control={
          <Checkbox
            onChange={() =>
              props.onToggle(props.task.id, props.task.is_complited)
            }
            className={classes.checkbox}
            checked={props.task.is_complited}
          />
        }
      ></FormControlLabel>
      <div className={classes.labels}>
        <Typography variant="subtitle1">{props.task.text}</Typography>
        <Typography className={classes.task_date} variant="body2">
          {new Date(props.task.created_at).toLocaleString()}
        </Typography>
      </div>
      <IconButton onClick={() => props.onDelete(props.task.id)}>
        <Close className={classes.cross} />
      </IconButton>
    </div>
  );
}

export default Task;
