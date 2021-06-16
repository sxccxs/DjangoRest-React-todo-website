import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import useStyles from "./styles";

function Home(props) {
  const classes = useStyles();

  return (
    <div className="card-container-home">
      <Card className={"card " + classes.card} variant="outlined">
        <CardContent className="card-content">
          <Typography className="form-header-home" variant="h4" align="center">
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
            <Link to="/register/" className={classes.card_link}>
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
