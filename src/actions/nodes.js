import * as types from "../constants/actionTypes";
import * as Api from "../api/api";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const fetchNodeBlocksStart = (node) => {
  return {
    type: types.FETCH_NODE_BLOCKS_START,
    node,
  };
};

const fetchNodeBlocksSuccess = (node, res) => {
  return {
    type: types.FETCH_NODE_BLOCKS_SUCCESS,
    node,
    res,
  };
};

const fetchNodeBlocksFailure = (node) => {
  return {
    type: types.FETCH_NODE_BLOCKS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await Api.checkNodeStatus(node.url);
      dispatch(checkNodeStatusSuccess(node, res));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(nodes) {
  return (dispatch) => {
    nodes.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export function fetchNodeBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(fetchNodeBlocksStart(node));
      const res = await Api.fetchNodeBlocks(node.url);
      dispatch(fetchNodeBlocksSuccess(node, res));
    } catch (err) {
      dispatch(fetchNodeBlocksFailure(node));
    }
  };
}
