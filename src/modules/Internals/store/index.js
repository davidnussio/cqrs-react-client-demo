import makeActions from "../../../store/makeActions";
import makeDraftReducer from "../../../store/makeDraftReducer";
import initialState from "./initialState";
import saga from "../sagas";
import { reducer as fetchNewsReducer, fetchNews } from "./fetchNews";

const reducers = [fetchNewsReducer];

const actions = {
  fetchNews
};

const useActions = makeActions(actions);

const reducer = makeDraftReducer(initialState)((draft, action) => {
  reducers.forEach(r => r(draft, action));
});

export { reducer, useActions, initialState, actions, saga };
