import { combineReducers } from "redux";
import actionStatuses from "./actionStatuses";
import nodes from "./nodes";
import blocks from "./blocks";

const rootReducer = combineReducers({
  actionStatuses,
  entities: combineReducers({
    nodes,
    blocks,
  }),
});

export default rootReducer;
