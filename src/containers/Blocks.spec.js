import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import { CircularProgress } from "@material-ui/core";
import ConnectedBlocks, { Blocks } from "./Blocks";
import Block from "../components/Block";

describe("<Blocks />", () => {
  const actions = {
    fetchNodeBlocks: jest.fn(),
  };

  const nodeA = {
    url: "https://thawing-springs-53971.herokuapp.com",
    online: false,
    name: "Node 1",
    blocks: ["hashA", "hashB"],
  };

  const blocks = {
    byId: {
      hashA: {
        hash: "hashA",
        prevHash: "",
        data: "dataA",
        index: "1",
      },
      hashB: {
        hash: "hashB",
        prevHash: "hashA",
        data: "dataB",
        index: "2",
      },
    },
    allIds: ["hashA", "hashB"],
  };

  it("should contain <Block />", () => {
    const wrapper = shallow(
      <Blocks
        actions={actions}
        node={nodeA}
        blocks={blocks.allIds.map((blockId) => blocks.byId[blockId])}
        error={false}
        loading={false}
      />
    );

    expect(wrapper.find(Block).length).toEqual(2);
  });

  it("should show loading progress", () => {
    const wrapper = shallow(
      <Blocks
        actions={actions}
        node={nodeA}
        blocks={[]}
        error={false}
        loading={true}
      />
    );

    expect(wrapper.find(CircularProgress).length).toEqual(1);
  });

  it("should show error message", () => {
    const wrapper = shallow(
      <Blocks
        actions={actions}
        node={nodeA}
        blocks={[]}
        error={true}
        loading={false}
      />
    );
    const div = wrapper.find("div");
    expect(div.text()).toEqual("Oops, something wrong happened! :(");
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({
      actionStatuses: { fetchNodeBlocks: {} },
      entities: { blocks },
    });
    const component = create(
      <Provider store={store}>
        <ConnectedBlocks actions={actions} node={nodeA} />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
