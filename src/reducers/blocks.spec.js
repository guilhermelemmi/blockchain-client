import * as ActionTypes from "../constants/actionTypes";
import reducer from "./blocks";
import initialState from "./initialState";

describe("Reducers::Blocks", () => {
  const getInitialState = () => {
    return initialState().entities.blocks;
  };

  const nodeA = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  const blockA = {
    hash: "hashA",
    data: "dataA",
    index: 1,
  };

  const blockB = {
    hash: "hashB",
    data: "dataB",
    index: 2,
  };

  const blockC = {
    hash: "hashC",
    data: "dataC",
    index: 3,
  };
  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle FETCH_NODE_BLOCKS_SUCCESS", () => {
    const appState = {
      byId: { hashA: blockA, hashC: blockC },
      allIds: ["hashA", "hashC"],
    };
    const action = {
      type: ActionTypes.FETCH_NODE_BLOCKS_SUCCESS,
      node: nodeA,
      res: [blockA, blockB],
    };
    const expected = {
      byId: {
        [blockA.hash]: blockA,
        [blockB.hash]: blockB,
        [blockC.hash]: blockC,
      },
      allIds: [blockA.hash, blockC.hash, blockB.hash],
    };
    expect(reducer(appState, action)).toEqual(expected);
  });
});
