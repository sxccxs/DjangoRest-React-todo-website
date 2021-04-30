import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
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
    justifyContent: "space-between",
  },
  checkbox: {
    color: theme.palette.success.light + " !important",
  },
  cross: {
    color: "white !important",
  },
}));

function Task(props) {
  const classes = useStyles();

  return (
    <div className={classes.task}>
      <FormControlLabel
        control={<Checkbox className={classes.checkbox} />}
        label={props.label}
      ></FormControlLabel>
      <IconButton>
        <Close className={classes.cross} />
      </IconButton>
    </div>
  );
}

export default Task;
