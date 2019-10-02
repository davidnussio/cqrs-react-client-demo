import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/styles";

import { useActions } from "../store";
import useCommand from "../../../cqrs/useCommand";
import app from "../../../client";

function deleteNews(aggregateId) {
  return {
    aggregateName: "news",
    aggregateId,
    type: "deleteNews",
    payload: {}
  };
}

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

function NewsList() {
  const classes = useStyles();
  const { fetchNews } = useActions();
  const newsList = useSelector(store => store.news);
  const commandDispacher = useCommand();

  useEffect(() => {
    fetchNews();
    subscribeToService("news-list", fetchNews);
    return () => {
      unsubscribeToService("news-list", fetchNews);
    };
  }, [fetchNews]);

  return (
    <div className={classes.paperPage}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Votes</TableCell>
            <TableCell align="right">Comments</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsList.data.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                <Link to={`/news/${row._id}`}>{row.title}</Link>
              </TableCell>
              <TableCell align="right">{row.voted}</TableCell>
              <TableCell align="right">{row.comments}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    commandDispacher(deleteNews(row._id));
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default NewsList;
