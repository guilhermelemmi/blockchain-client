import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import * as api from "../api/api";
jest.mock("../api/api");
describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the node status", async () => {
    const fetchStub = jest
      .spyOn(api, "checkNodeStatus")
      .mockReturnValueOnce(Promise.resolve({ name: "Secret Lowlands" }));
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { name: "Secret Lowlands" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
    fetchStub.mockRestore();
  });

  it("should fail to fetch the node status", async () => {
    const fetchStub = jest
      .spyOn(api, "checkNodeStatus")
      .mockReturnValueOnce(Promise.reject(new Error("error")));
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
    fetchStub.mockRestore();
  });

  it("should fetch the node blocks", async () => {
    const fetchStub = jest
      .spyOn(api, "fetchNodeBlocks")
      .mockReturnValueOnce(
        Promise.resolve([{ hash: "hashA" }, { hash: "hashB" }])
      );
    await ActionCreators.fetchNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_NODE_BLOCKS_START,
        node,
      },
      {
        type: ActionTypes.FETCH_NODE_BLOCKS_SUCCESS,
        node,
        res: [{ hash: "hashA" }, { hash: "hashB" }],
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
    fetchStub.mockRestore();
  });

  it("should fail to fetch the node blocks", async () => {
    const fetchStub = jest
      .spyOn(api, "fetchNodeBlocks")
      .mockReturnValueOnce(Promise.reject(new Error("error")));
    await ActionCreators.fetchNodeBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_NODE_BLOCKS_START,
        node,
      },
      {
        type: ActionTypes.FETCH_NODE_BLOCKS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
    fetchStub.mockRestore();
  });
});
