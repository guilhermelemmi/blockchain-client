import * as ActionTypes from "../constants/actionTypes";
import { ACTION_STATUSES } from "../constants/acctionStatuses";
import reducer from "./actionStatuses";
import initialState from "./initialState";

describe("Reducers::Blocks", () => {
  const getInitialState = () => {
    return initialState().actionStatuses;
  };

  const nodeA = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_START", () => {
    const appState = {
      checkNodeStatus: {},
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_START,
      node: nodeA,
    };
    const expected = {
      checkNodeStatus: {
        [action.node.url]: ACTION_STATUSES.START,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_SUCCESS", () => {
    const appState = {
      checkNodeStatus: {},
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
      node: nodeA,
    };
    const expected = {
      checkNodeStatus: {
        [action.node.url]: ACTION_STATUSES.SUCCESS,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_FAILURE", () => {
    const appState = {
      checkNodeStatus: {},
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
      node: nodeA,
    };
    const expected = {
      checkNodeStatus: {
        [action.node.url]: ACTION_STATUSES.FAILURE,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle FETCH_NODE_BLOCKS_START", () => {
    const appState = {
      fetchNodeBlocks: {},
    };
    const action = {
      type: ActionTypes.FETCH_NODE_BLOCKS_START,
      node: nodeA,
    };
    const expected = {
      fetchNodeBlocks: {
        [action.node.url]: ACTION_STATUSES.START,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle FETCH_NODE_BLOCKS_SUCCESS", () => {
    const appState = {
      fetchNodeBlocks: {},
    };
    const action = {
      type: ActionTypes.FETCH_NODE_BLOCKS_SUCCESS,
      node: nodeA,
    };
    const expected = {
      fetchNodeBlocks: {
        [action.node.url]: ACTION_STATUSES.SUCCESS,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle FETCH_NODE_BLOCKS_FAILURE", () => {
    const appState = {
      fetchNodeBlocks: {},
    };
    const action = {
      type: ActionTypes.FETCH_NODE_BLOCKS_FAILURE,
      node: nodeA,
    };
    const expected = {
      fetchNodeBlocks: {
        [action.node.url]: ACTION_STATUSES.FAILURE,
      },
    };
    expect(reducer(appState, action)).toEqual(expected);
  });
});
