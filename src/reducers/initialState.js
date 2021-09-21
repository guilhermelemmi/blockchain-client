const initialState = () => ({
  actionStatuses: {
    checkNodeStatus: {},
    fetchNodeBlocks: {},
  },
  entities: {
    nodes: {
      byId: {
        "https://thawing-springs-53971.herokuapp.com": {
          url: "https://thawing-springs-53971.herokuapp.com",
          online: false,
          name: "Node 1",
          blocks: [],
        },
        "https://secret-lowlands-62331.herokuapp.com": {
          url: "https://secret-lowlands-62331.herokuapp.com",
          online: false,
          name: "Node 2",
          blocks: [],
        },
        "https://calm-anchorage-82141.herokuapp.com": {
          url: "https://calm-anchorage-82141.herokuapp.com",
          online: false,
          name: "Node 3",
          blocks: [],
        },
        "http://localhost:3002": {
          url: "http://localhost:3002",
          online: false,
          name: "Node 4",
          blocks: [],
        },
      },
      allIds: [
        "https://thawing-springs-53971.herokuapp.com",
        "https://secret-lowlands-62331.herokuapp.com",
        "https://calm-anchorage-82141.herokuapp.com",
        "http://localhost:3002",
      ],
    },
    blocks: {
      byId: {},
      allIds: [],
    },
  },
});
export default initialState;
