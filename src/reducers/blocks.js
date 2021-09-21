import { FETCH_NODE_BLOCKS_SUCCESS } from "../constants/actionTypes";
import { combineReducers } from "redux";

function blocksById(state = {}, action) {
  switch (action.type) {
    case FETCH_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        ...action.res.reduce((acc, curr) => {
          return {
            ...acc,
            [curr.hash]: curr,
          };
        }, {}),
      };
    default:
      return state;
  }
}

function allBlocks(state = [], action) {
  switch (action.type) {
    case FETCH_NODE_BLOCKS_SUCCESS:
      return [...new Set([...state, ...action.res.map((block) => block.hash)])];
    default:
      return state;
  }
}

export default combineReducers({
  byId: blocksById,
  allIds: allBlocks,
});
