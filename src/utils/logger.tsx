import { PayloadAction } from "@reduxjs/toolkit";
import { Store } from "redux";

const logger = (store: Store) => (next: any) => (action: PayloadAction) => {
  console.group(action.type);
  console.log(
    "%c prev state",
    "background: #222; color: #bada55",
    store.getState()
  );
  console.info("%c dispatching", "background: #222; color: #ba55da", action);
  let result = next(action);
  console.log(
    "%c next state",
    "background: #222; color: #55bada",
    store.getState()
  );
  console.groupEnd();
  return result;
};

export default logger;
