import * as ActionTypes from "../constants/actionTypes";
import reducer from "./nodes";
import initialState from "./initialState";

describe("Reducers::Nodes", () => {
  const getInitialState = () => {
    return initialState().entities.nodes;
  };

  const nodeA = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  const nodeB = {
    url: "http://localhost:3003",
    online: false,
    name: null,
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_SUCCESS", () => {
    const appState = {
      byId: { [nodeA.url]: nodeA, [nodeB.url]: nodeB },
      allIds: [nodeA.url, nodeB.url],
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
      node: nodeA,
      res: { name: "alpha" },
    };
    const expected = {
      byId: {
        [nodeA.url]: {
          ...nodeA,
          online: true,
          name: "alpha",
        },
        [nodeB.url]: nodeB,
      },
      allIds: [nodeA.url, nodeB.url],
    };
    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_FAILURE", () => {
    const appState = {
      byId: {
        [nodeA.url]: {
          ...nodeA,
          online: true,
          name: "alpha",
        },
        [nodeB.url]: nodeB,
      },
      allIds: [nodeA.url, nodeB.url],
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      byId: {
        [nodeA.url]: {
          ...nodeA,
          online: false,
          name: "alpha",
        },
        [nodeB.url]: nodeB,
      },
      allIds: [nodeA.url, nodeB.url],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
  it("should handle FETCH_NODE_BLOCKS_SUCCESS", () => {
    const appState = {
      byId: {
        [nodeA.url]: nodeA,
        [nodeB.url]: nodeB,
      },
      allIds: [nodeA.url, nodeB.url],
    };
    const action = {
      type: ActionTypes.FETCH_NODE_BLOCKS_SUCCESS,
      node: nodeA,
      res: [{ hash: "block1" }, { hash: "block2" }],
    };
    const expected = {
      byId: {
        [nodeA.url]: {
          ...nodeA,
          blocks: ["block1", "block2"],
        },
        [nodeB.url]: nodeB,
      },
      allIds: [nodeA.url, nodeB.url],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
