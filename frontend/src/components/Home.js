import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card_link: {
    textDecoration: "underline",
  },
  card: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  card_header: {
    marginTop: "1rem !important",
    marginBottom: "1.5rem !important",
  },
  card_text: {
    marginBottom: "1rem !important",
  },
}));

function Home(props) {
  const classes = useStyles();

  return (
    <div className="card-container">
      <Card className={"card " + classes.card} variant="outlined">
        <CardContent className="card-content">
          <Typography
            className={classes.card_header}
            variant="h4"
            align="center"
          >
            Accomplish more today, free more tomorrow
          </Typography>
          <Typography
            className={classes.card_text}
            variant="body1"
            align="center"
          >
            Life can be overwhelming, but it doesn't have to. This site lets you
            keep track of everything in one place, so you can get it all done
            and enjoy more peace of mind along the way.
          </Typography>
          <Typography
            className={classes.card_text}
            variant="subtitle2"
            align="center"
          >
            Just{" "}
            <Link to="/login/" className={classes.card_link}>
              Sign up
            </Link>{" "}
            to start using.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
