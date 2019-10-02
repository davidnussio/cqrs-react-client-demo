import { call, put, takeEvery } from "redux-saga/effects";

import Api from "./services";
import {
  FETCH_NEWS,
  NEWS_FETCH_SUCCEEDED,
  NEWS_FETCH_FAILED
} from "./eventTypes";

function* fetchNews() {
  try {
    const payload = yield call(Api.fetchNews);
    yield put({ type: NEWS_FETCH_SUCCEEDED, payload });
  } catch (e) {
    yield put({ type: NEWS_FETCH_FAILED, message: e.message });
  }
}

function* saga() {
  yield takeEvery(FETCH_NEWS, fetchNews);
}

export default saga;
