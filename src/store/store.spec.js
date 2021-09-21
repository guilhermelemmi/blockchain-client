import * as ActionTypes from "../constants/actionTypes";

import configureStore from "./configureStore";

describe("Store", () => {
  const initialState = {
    actionStatuses: {},
    entities: {
      nodes: {
        byId: {
          "a.com": { url: "a.com", online: false, name: null, loading: false },
          "b.com": { url: "b.com", online: false, name: null, loading: false },
          "c.com": { url: "c.com", online: false, name: null, loading: false },
          "d.com": { url: "d.com", online: false, name: null, loading: false },
        },
        allIds: ["a.com", "b.com", "c.com", "d.com"],
      },
      blocks: {
        byId: {},
        allIds: [],
      },
    },
  };

  beforeAll(() => {});
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const store = configureStore(initialState);
    const nodes = initialState.entities.nodes;

    const actions = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[0]],
        res: { name: "alpha" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[1]],
        res: { name: "beta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[0]],
        res: { name: "gamma" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[2]],
        res: { name: "delta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[1]],
        res: { name: "epsilon" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[0]],
        res: { name: "zeta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[0]],
        res: { name: "eta" },
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node: nodes.byId[nodes.allIds[0]],
        res: { name: "theta" },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      byId: {
        "a.com": { url: "a.com", online: true, name: "theta", loading: false },
        "b.com": {
          url: "b.com",
          online: true,
          name: "epsilon",
          loading: false,
        },
        "c.com": { url: "c.com", online: true, name: "delta", loading: false },
        "d.com": { url: "d.com", online: false, name: null, loading: false },
      },
      allIds: ["a.com", "b.com", "c.com", "d.com"],
    };

    expect(actual.entities.nodes).toEqual(expected);
  });
});
