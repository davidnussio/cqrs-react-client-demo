import saga from "./sagas";
import makeActions from "../store/makeActions";

import { subscribeViewModel, unsubscribeViewModel } from "./actions";

const actions = {
  subscribeViewModel,
  unsubscribeViewModel
};

const useActions = makeActions(actions);

export { saga, useActions };
