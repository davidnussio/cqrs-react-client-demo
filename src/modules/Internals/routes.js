import React from "react";
import { Switch, Route } from "react-router-dom";

import InternalsView from "./containers/InternalsView";

function InternalsRouter({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={InternalsView} />
    </Switch>
  );
}

export default InternalsRouter;
