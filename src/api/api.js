import fetch from "cross-fetch";

export const checkNodeStatus = async (nodeUrl) => {
  const res = await fetch(`${nodeUrl}/api/v1/status`);
  if (res.status >= 400) {
    throw new Error(`${res.status} - Error checking node status`);
  }
  const json = await res.json();
  return {
    name: json.node_name,
  };
};

export const fetchNodeBlocks = async (nodeUrl) => {
  const res = await fetch(`${nodeUrl}/api/v1/blocks`);
  if (res.status >= 400) {
    throw new Error(`${res.status} - Error fetching node blocks`);
  }
  const json = await res.json();
  return json.data.map((block) => block.attributes);
};
