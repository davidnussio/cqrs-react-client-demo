import { hot } from "react-hot-loader/root";
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import AppHeaderPage from "../modules/AppHeader/container";

const NewsContainerPage = lazy(() => import("../modules/News/routes"));
const InternalsContainerPage = lazy(() =>
  import("../modules/Internals/routes")
);
const LazyContainerPage = lazy(() => import("./LazyContainer"));

function PageNotFound() {
  return <div>Page Not Found</div>;
}

function LoadingMessage() {
  return <div>Loading Message....</div>;
}

function Main() {
  return (
    <Suspense fallback={<LoadingMessage />}>
      {/* <Redirect exact from="/" to="/news" /> */}
      <Route path="/" component={AppHeaderPage} />
      <Switch>
        <Route path="/news" component={NewsContainerPage} />
        <Route path="/internals" component={InternalsContainerPage} />
        <Route path="/test-saga" component={LazyContainerPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Suspense>
  );
}

export default hot(Main);
