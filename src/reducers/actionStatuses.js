import { ACTION_STATUSES } from "../constants/acctionStatuses";
import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  FETCH_NODE_BLOCKS_START,
  FETCH_NODE_BLOCKS_SUCCESS,
  FETCH_NODE_BLOCKS_FAILURE,
} from "../constants/actionTypes";

const mapActionToStatus = {
  CHECK_NODE_STATUS_START: ACTION_STATUSES.START,
  CHECK_NODE_STATUS_SUCCESS: ACTION_STATUSES.SUCCESS,
  CHECK_NODE_STATUS_FAILURE: ACTION_STATUSES.FAILURE,
  FETCH_NODE_BLOCKS_START: ACTION_STATUSES.START,
  FETCH_NODE_BLOCKS_SUCCESS: ACTION_STATUSES.SUCCESS,
  FETCH_NODE_BLOCKS_FAILURE: ACTION_STATUSES.FAILURE,
};

export default function actionStatusesReducer(
  state = { checkNodeStatus: {}, fetchNodeBlocks: {} },
  action
) {
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
    case CHECK_NODE_STATUS_SUCCESS:
    case CHECK_NODE_STATUS_FAILURE:
      return {
        ...state,
        checkNodeStatus: {
          ...state.checkNodeStatus,
          [action.node.url]: mapActionToStatus[action.type],
        },
      };
    case FETCH_NODE_BLOCKS_START:
    case FETCH_NODE_BLOCKS_SUCCESS:
    case FETCH_NODE_BLOCKS_FAILURE:
      return {
        ...state,
        fetchNodeBlocks: {
          ...state.fetchNodeBlocks,
          [action.node.url]: mapActionToStatus[action.type],
        },
      };
    default:
      return state;
  }
}
