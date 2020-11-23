export const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}.${
    newDate.getMonth() + 1
  }.${newDate.getFullYear()}`;
};

export const stripEmptyNodes = (nodes) => {
  const edges = nodes.edges.filter((value) => {
    return Object.keys(value.node).length !== 0;
  });
  return { ...nodes, edges: edges };
};

export const getCategories = (post) => {
  let categories = [];
  if (post.newsCats) {
    categories = post.newsCats.nodes;
  } else if (post.projectsCats) {
    categories = post.projectsCats.nodes;
  } else if (post.projectsCats) {
    categories = post.aboutCats.nodes;
  }
  return categories;
};
