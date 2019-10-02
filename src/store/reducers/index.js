import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { saga as sagaCqrs } from "../../cqrs/store";
import { reducer as news, saga as sagaNews } from "../../modules/News/store";

function createRootReducer({ history }) {
  return combineReducers({
    router: connectRouter(history),
    news
  });
}

export default function* rootSaga() {
  yield all([sagaCqrs(), sagaNews()]);
}

export { createRootReducer, rootSaga };
