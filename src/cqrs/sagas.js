import {
  all,
  race,
  call,
  take,
  cancel,
  fork,
  put,
  takeEvery
} from "redux-saga/effects";

import { eventChannel } from "redux-saga";
import Api from "./services";
import {
  EXECUTE_COMMAND,
  COMMAND_EXECUTED_SUCCEEDED,
  COMMAND_EXECUTED_FAILED,
  VIEW_MODEL_SUBSCRIBE,
  VIEW_MODEL_UNSUBSCRIBE
} from "./eventTypes";
import app from "../client";

function* executeCommand(action) {
  try {
    const data = yield call(Api.commandDispatcher, action.command);
    yield put({ type: COMMAND_EXECUTED_SUCCEEDED, data });
  } catch (e) {
    yield put({ type: COMMAND_EXECUTED_FAILED, message: e.message });
  }
}

function* openViewModelChannel(action) {
  console.log("view model channel", action.viewModel);
  const channel = eventChannel(emitter => {
    console.log("registed services");
    app.service(action.viewModel).on("created", emitter);
    app.service(action.viewModel).on("removed", emitter);
    app.service(action.viewModel).on("patched", emitter);
    app.service(action.viewModel).on("updated", emitter);

    return () => {
      app.service(action.viewModel).removeListener("created", emitter);
      app.service(action.viewModel).removeListener("removed", emitter);
      app.service(action.viewModel).removeListener("patched", emitter);
      app.service(action.viewModel).removeListener("updated", emitter);
    };
  });

  while (true) {
    const { unsubscribe, chan } = yield race({
      unsubscribe: take(VIEW_MODEL_UNSUBSCRIBE),
      chan: take(channel)
    });
    if (unsubscribe && unsubscribe.viewModel === action.viewModel) {
      channel.close();
      yield cancel();
    } else if (chan) {
      yield put({
        type: `VIEW_MODEL_${action.viewModel.toUpperCase()}_EVENT`,
        payload: { viewModel: action.viewModel, ...chan.action }
      });
    }
  }
}

function* subscribeViewModel() {
  while (true) {
    const action = yield take(VIEW_MODEL_SUBSCRIBE);

    const forked = yield fork(openViewModelChannel, action);
    console.log("forked", forked);
  }
}

function* saga() {
  yield all([takeEvery(EXECUTE_COMMAND, executeCommand), subscribeViewModel()]);
}

export default saga;
