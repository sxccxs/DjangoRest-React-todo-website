import { makeStyles } from "@material-ui/core/styles";
import Task from "./Task";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card_container: {
    paddingLeft: "10rem !important",
    paddingRight: "10rem !important",
  },
  card: {
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

function List() {
  const classes = useStyles();

  return (
    <div className={"card-container " + classes.card_container}>
      <Card className={"card " + classes.card} variant="outlined">
        <CardContent className="card-content">
          <Typography
            className={classes.card_header}
            variant="subtitle1"
            align="left"
          >
            Welcome, Admin !!!
          </Typography>
          <div className={classes.input_label}>
            <TextField
              className={classes.input}
              label="What do you need today?"
            />

            <Button
              className={classes.button}
              variant="contained"
              size="medium"
            >
              Add
            </Button>
          </div>
          <div className="">
            <Task label="Do my homework"></Task>
            <Task label="Wash the dishes"></Task>
            <Task label="Clean my room"></Task>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default List;
