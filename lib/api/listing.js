import fetchAPI from "./fetchApi";
import { stripEmptyNodes } from "../util";

export async function getPosts(category, endCursor) {
  switch (category) {
    case "news":
      return await getNews(endCursor);
    case "projects":
      return await getProjects(endCursor);
    case "about":
      return await getAbouts(endCursor);
    default:
      return await getAllPosts(endCursor);
  }
}

async function getNews(after) {
  const data = await fetchAPI(
    `
    query News($after: String) {
      news(first: 15, after: $after, where: {status: PUBLISH}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            newsCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
       
    `,
    {
      variables: {
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.news);
  }
}
async function getProjects(after) {
  const data = await fetchAPI(
    `
    query Projects($after: String) {
      projects(first: 15, after: $after, where: {status: PUBLISH}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            projectsCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }       
    `,
    {
      variables: {
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.projects);
  }
}
async function getAbouts(after) {
  const data = await fetchAPI(
    `
    query Abouts($after: String) {
      abouts(first: 15, after: $after, where: {status: PUBLISH}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            aboutCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }  
    `,
    {
      variables: {
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.abouts);
  }
}
async function getAllPosts(after) {
  const data = await fetchAPI(
    `
    query AllPosts($after: String) {
      contentNodes(first: 15, after: $after, where: {status: PUBLISH}) {
        edges {
          node {
            ... on About {
              id
              slug
              date
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: HOMEPAGE)
                }
              }
              contentType {
                node {
                  name
                }
              }
              aboutCats {
                nodes {
                  name
                }
              }
            }
            ... on New {
              id
              slug
              date
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: HOMEPAGE)
                }
              }
              contentType {
                node {
                  name
                }
              }
              newsCats {
                nodes {
                  name
                }
              }
            }
            ... on Project {
              id
              slug
              date
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: HOMEPAGE)
                }
              }
              contentType {
                node {
                  name
                }
              }
              projectsCats {
                nodes {
                  name
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }    
    `,
    {
      variables: {
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.contentNodes);
  }
}

export async function getPostsBySubcategory(category, subcategory, endCursor) {
  switch (category) {
    case "news":
      return await getNewsBySubcategory(subcategory, endCursor);
    case "projects":
      return await getProjectsBySubcategory(subcategory, endCursor);
    case "about":
      return await getAboutsBySubcategory(subcategory, endCursor);
    default:
      return;
  }
}

async function getNewsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query News($category: [String], $after: String) {
      news(first: 15, after: $after, where: {taxQuery: {taxArray: {taxonomy: NEWSCAT, operator: IN, terms: $category, field: SLUG}}}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            newsCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    
    `,
    {
      variables: {
        category: [category],
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.news);
  }
}
async function getProjectsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query Projects($category: [String], $after: String) {
      projects(first: 15, after: $after, where: {taxQuery: {taxArray: {taxonomy: PROJECTSCAT, operator: IN, terms: $category, field: SLUG}}}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            projectsCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    
    `,
    {
      variables: {
        category: [category],
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.projects);
  }
}
async function getAboutsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query Abouts($category: [String], $after: String) {
      abouts(first: 15, after: $after, where: {taxQuery: {taxArray: {taxonomy: ABOUTCAT, operator: IN, terms: $category, field: SLUG}}}) {
        edges {
          node {
            id
            slug
            date
            title
            excerpt
            featuredImage {
              node {
                sourceUrl(size: HOMEPAGE)
              }
            }
            contentType {
              node {
                name
              }
            }
            aboutCats {
              nodes {
                name
              }
            }
          }
        },
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }  
    
    `,
    {
      variables: {
        category: [category],
        after: after,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.abouts);
  }
}

export async function fetchCategories() {
  const data = await fetchAPI(
    `
    query Categories {
    newsCats(first: 16) {
        nodes {
          name
        }
      }
    projectsCats(first: 16) {
        nodes {
          name
        }
      }
    aboutCats(first: 16) {
        nodes {
          name
        }
      }
    }
  `
  );

  return data;
}
