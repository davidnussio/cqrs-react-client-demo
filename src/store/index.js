import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { createRootReducer, rootSaga } from "./reducers";

export const history = createBrowserHistory({ basename: "/" });

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const loggerMiddleware = createLogger({ collapsed: true });
  const store = createStore(
    createRootReducer({ history }),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        loggerMiddleware
      )
    )
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
