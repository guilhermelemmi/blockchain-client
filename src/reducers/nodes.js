import {
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  FETCH_NODE_BLOCKS_SUCCESS,
} from "../constants/actionTypes";
import { combineReducers } from "redux";
import initialState from "./initialState";

function nodesById(state = initialState().entities.nodes.byId, action) {
  switch (action.type) {
    case CHECK_NODE_STATUS_SUCCESS:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          ...action.res,
          online: true,
        },
      };
    case CHECK_NODE_STATUS_FAILURE:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          online: false,
        },
      };
    case FETCH_NODE_BLOCKS_SUCCESS:
      return {
        ...state,
        [action.node.url]: {
          ...state[action.node.url],
          blocks: action.res.map((block) => block.hash),
        },
      };
    default:
      return state;
  }
}

function allNodes(state = initialState().entities.nodes.allIds, action) {
  switch (action.type) {
    case CHECK_NODE_STATUS_SUCCESS:
      return [...new Set([...state, action.node.url])];
    default:
      return state;
  }
}

export default combineReducers({
  byId: nodesById,
  allIds: allNodes,
});
