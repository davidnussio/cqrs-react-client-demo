import { useMemo } from "react";
import { useDispatch } from "react-redux";

const makeActions = actions => () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return Object.keys(actions).reduce((prevActions, actionName) => {
      return {
        ...prevActions,
        [actionName]: payload => dispatch(actions[actionName](payload))
      };
    }, {});
  }, [dispatch]);
};

export default makeActions;
