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
  } else if (post.aboutCats) {
    categories = post.aboutCats.nodes;
  }
  return categories;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const iOS = () => {
  if (!process.browser) {
    return false;
  }
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};
export const Android = () => {
  if (!process.browser) {
    return false;
  }
  const isAndroid = navigator.userAgent.includes("Android");
  return isAndroid;
};
