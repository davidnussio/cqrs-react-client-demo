import { useDispatch } from "react-redux";
import { EXECUTE_COMMAND } from "./eventTypes";

function useCommand() {
  const dispatch = useDispatch();

  return function commandDispatch(command) {
    dispatch({
      type: EXECUTE_COMMAND,
      command
    });
  };
}

export default useCommand;
