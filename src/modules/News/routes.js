import React from "react";
import { Switch, Route } from "react-router-dom";
import NewsList from "./containers/NewsList";
import NewsShow from "./containers/NewsShow";

function NewsRouter({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={NewsList} />
      <Route path={`${match.url}/:id`} component={NewsShow} />
    </Switch>
  );
}

export default NewsRouter;
