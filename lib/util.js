export const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}.${
    newDate.getMonth() + 1
  }.${newDate.getFullYear()}`;
};

export const stripEmptyNodes = (nodes) => {
  const edges = nodes.contentNodes.edges.filter((value) => {
    return Object.keys(value.node).length !== 0;
  });
  return { ...nodes.contentNodes, edges: edges };
};
