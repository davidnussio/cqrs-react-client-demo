import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import app from "../../../client";
import AggregateCard from "../components/AggregateCard";
import ViewModelCard from "../components/ViewModelCard";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1)
  }
}));

function subscribeToService(serviceName, callback) {
  app.service(serviceName).on("created", callback);
  app.service(serviceName).on("removed", callback);
  app.service(serviceName).on("patched", callback);
  app.service(serviceName).on("updated", callback);
}

function unsubscribeToService(serviceName, callback) {
  app.service(serviceName).removeListener("created", callback);
  app.service(serviceName).removeListener("removed", callback);
  app.service(serviceName).removeListener("patched", callback);
  app.service(serviceName).removeListener("updated", callback);
}

function InternalsView() {
  const classes = useStyles();
  const [internals, setInternals] = useState({
    aggregates: [],
    viewModels: []
  });
  useEffect(() => {
    async function fetchData() {
      const results = await app.service("internals").find({});
      setInternals(results);
    }
    fetchData();
    subscribeToService("read-model", fetchData);
    return () => {
      unsubscribeToService("read-model", fetchData);
    };
  }, []);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={6}>
        <Typography className={classes.card} variant="h6">
          Aggregates
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.card} variant="h6">
          View Models
        </Typography>
      </Grid>
      <Grid container item xs={6}>
        {internals.aggregates.map(aggregate => (
          <Grid item xs={12}>
            <AggregateCard aggregate={aggregate} />
          </Grid>
        ))}
      </Grid>
      <Grid container item xs={6}>
        {internals.viewModels.map(viewModel => (
          <Grid item xs={12}>
            <ViewModelCard viewModel={viewModel} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

function InternalsRouter({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={InternalsView} />
    </Switch>
  );
}

export default InternalsRouter;
