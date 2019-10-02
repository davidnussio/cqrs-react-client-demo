import React from "react";
import {
  Typography,
  Grid,
  CardHeader,
  Card,
  CardContent,
  Link,
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

export default function ViewModelCard({ viewModel }) {
  const classes = useStyles();
  const { name, route, eventHandlers } = viewModel;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={name.toUpperCase()}
        subheader={
          <Link
            href="#openWin"
            variant="body2"
            onClick={() => {
              window.open(`/api${route}`, "_blank");
            }}
          >
            /api{route}
          </Link>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <Grid container>
            <Grid item xs={6}>
              Event Handlers:
              <ul>
                {eventHandlers.map(command => (
                  <li>{command}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}
