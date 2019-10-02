import React, { useRef } from "react";
import { Input, Button } from "@material-ui/core";

import { useActions } from "../cqrs/store";

export default function LazyContainer() {
  const inputRef = useRef("");
  const { subscribeViewModel, unsubscribeViewModel } = useActions();

  return (
    <div>
      <Input inputRef={inputRef} type="text" defaultValue="news-list" />
      <Button onClick={() => subscribeViewModel(inputRef.current.value)}>
        +
      </Button>
      <Button onClick={() => unsubscribeViewModel(inputRef.current.value)}>
        -
      </Button>
    </div>
  );
}
