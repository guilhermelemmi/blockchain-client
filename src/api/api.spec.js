import * as Api from "../api/api";
import mockFetch from "cross-fetch";
jest.mock("cross-fetch");
describe("Api", () => {
  afterAll(() => {
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should succeed fetching the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    const actual = await Api.checkNodeStatus(node.url);
    const expected = { name: "Secret Lowlands" };
    expect(actual).toEqual(expected);
  });

  it("should fail fetching the node status", async () => {
    const mockErrorHandler = jest.fn();
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    try {
      actual = await Api.checkNodeStatus(node.url);
    } catch (err) {
      mockErrorHandler(err);
    }
    expect(mockErrorHandler).toHaveBeenCalledWith(
      new Error("400 - Error checking node status")
    );
  });

  it("should succeed fetching the node blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({
            data: [
              { attributes: { hash: "hashA" } },
              { attributes: { hash: "hashB" } },
            ],
          });
        },
      })
    );
    const actual = await Api.fetchNodeBlocks(node.url);
    const expected = [{ hash: "hashA" }, { hash: "hashB" }];
    expect(actual).toEqual(expected);
  });

  it("should fail fetching the node blocks", async () => {
    const mockErrorHandler = jest.fn();
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    try {
      actual = await Api.fetchNodeBlocks(node.url);
    } catch (err) {
      mockErrorHandler(err);
    }
    expect(mockErrorHandler).toHaveBeenCalledWith(
      new Error("400 - Error fetching node blocks")
    );
  });
});
