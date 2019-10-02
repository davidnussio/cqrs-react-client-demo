import React, { useEffect, useState } from "react";
import { Typography, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReactSelect from "react-select";

import { format } from "date-fns";
import app from "../../../client";
import NewsCard from "../components/NewsCard";

const useStyles = makeStyles(theme => ({
  paperPage: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 650
  },
  jsonRaw: {
    whiteSpace: "pre-wrap",
    padding: theme.spacing(2)
  },
  topMarginCard: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  multiSelect: { width: "100%" },
  option: { padding: theme.spacing(0.5) }
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

function NewsShow({ match }) {
  const classes = useStyles();
  const [news, setNews] = useState({});
  const [history, setHistory] = useState([]);
  const [finishTime, setFinishTime] = useState({
    value: undefined,
    label: undefined
  });

  useEffect(() => {
    async function fetchData() {
      const results = await app
        .service("history")
        .find({ query: { readModel: "news", aggregateId: match.params.id } });
      const sortedEvents = results.reverse().map(h => ({
        value: h.timestamp,
        label: `[ver. ${h.version}] - ${format(
          h.timestamp,
          "E, dd LLL yyyy - hh:mm:ss.SSS (XX)"
        )} (Event: ${h.eventType})`
      }));
      setHistory(sortedEvents);
      if (!finishTime.value) {
        // TODO: here? make unwanted deps
        setFinishTime(sortedEvents[0]);
      }
    }
    fetchData();
    subscribeToService("history", fetchData);
    return () => {
      unsubscribeToService("history", fetchData);
    };
  }, [match.params.id, finishTime]);

  useEffect(() => {
    async function fetchData() {
      const results = await app.service("read-model").find({
        query: {
          readModel: "news",
          aggregateId: match.params.id,
          ...(finishTime && { finishTime: finishTime.value + 1 })
        }
      });
      setNews(results);
    }
    fetchData();
    subscribeToService("read-model", fetchData);
    return () => {
      unsubscribeToService("read-model", fetchData);
    };
  }, [finishTime, match.params.id]);

  return (
    <div className={classes.paperPage}>
      <Typography variant="overline" component="h2">
        {match.params.id}
      </Typography>
      <ReactSelect
        isSearchable={false}
        options={history}
        onChange={option => {
          if (option && !Array.isArray(option)) {
            setFinishTime(option);
          }
        }}
        value={finishTime}
        placeholder="🎉 Loading..."
      />
      <div className={classes.topMarginCard}>
        <Select
          className={classes.multiSelect}
          multiple
          native
          defaultValue={finishTime.value}
          onChange={event => {
            if (event.target.selectedOptions) {
              const selectedOption =
                event.target.options[event.target.selectedIndex];
              setFinishTime({
                value: Number(selectedOption.value),
                label: selectedOption.label
              });
            }
          }}
          inputProps={{
            autoFocus: true,
            id: "select-multiple-native"
          }}
        >
          {history.map(({ value, label }) => (
            <option className={classes.option} key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div className={classes.topMarginCard}>
        {news.createdAt && <NewsCard news={news} />}
      </div>
      {/* <Card className={classes.topMarginCard}>
        <pre className={classes.jsonRaw}>{JSON.stringify(news, " ", 2)}</pre>
      </Card> */}
    </div>
  );
}

export default NewsShow;
