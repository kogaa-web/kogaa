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
    case "all":
      return await getAllPosts(endCursor);
    default:
      return;
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
export async function getBySubcategory(category) {
  const data = await fetchAPI(
    `
    query MyQuery($category: String) {
      news(where: {taxQuery: {taxArray: {taxonomy: NEWSCAT, operator: IN, terms: $category, field: SLUG}}}) {
        edges {
          node {
            title
          }
        }
      }
    }
    
    `,
    {
      variables: {
        category: category,
      },
    }
  );

  if (data) {
    return stripEmptyNodes(data.news);
  }
}
export async function fetchCategories() {
  const data = await fetchAPI(
    `
    query Categories {
      newsCats {
        nodes {
          name
        }
      }
      projectsCats {
        nodes {
          name
        }
      }
      aboutCats {
        nodes {
          name
        }
      }
    }
  `
  );

  return data;
}
