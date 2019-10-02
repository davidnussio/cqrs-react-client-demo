import { VIEW_MODEL_SUBSCRIBE, VIEW_MODEL_UNSUBSCRIBE } from "./eventTypes";

export function subscribeViewModel(viewModel) {
  return {
    type: VIEW_MODEL_SUBSCRIBE,
    viewModel
  };
}

export function unsubscribeViewModel(viewModel) {
  return {
    type: VIEW_MODEL_UNSUBSCRIBE,
    viewModel
  };
}
