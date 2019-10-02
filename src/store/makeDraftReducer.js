import produce from 'immer';

const makeDraftReducer = initialState => fnReducer => (state = initialState, action) => {
  return produce(state, draft => fnReducer(draft, action));
};

export default makeDraftReducer;
