import React from "react";
import {
  Typography,
  Grid,
  CardHeader,
  Card,
  CardContent,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1)
  }
}));

export default function AggregateCard({ aggregate }) {
  const classes = useStyles();
  const { name, commands, events } = aggregate;
  const commandsCount = commands.length;
  const eventsCount = Object.keys(events).length;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={name.toUpperCase()}
        subheader={`${commandsCount} comandi e ${eventsCount} eventi`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Grid container>
            <Grid item xs={6}>
              Commands:
              <ul>
                {commands.map(command => (
                  <li>{command}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={6}>
              Events:
              <ul>
                {Object.keys(events).map(eventName => (
                  <li>{events[eventName]}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}
