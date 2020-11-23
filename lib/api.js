import { stripEmptyNodes } from "./util";

const API_URL = "https://kogaawp.vladislavbagnyuk.com/graphql";

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

// Notice the 'export' keyword here. We'll be calling this function
// directly in our blog/index.js page, so it needs to be exported

export async function getNews(after) {
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
export async function getProjects(after) {
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
export async function getAbouts(after) {
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

export async function getAllPosts(after) {
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

export async function getAllPostsWithSlug(type) {
  const data = await fetchAPI(
    `
    query getAllPostsWithSlug {
      contentNodes(first: 10000) {
        edges {
          node {
            ... on Architect {
              slug
            }
            ... on Post {
              slug
            }
          }
        }
      }
    }
  `
  );
  if (data) {
    return stripEmptyNodes(data.contentNodes);
  }
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    query GetContentNode($id: ID!) {
      contentNode(id: $id, idType: URI) {
        ... on About {
          id
          slug
          date
          title
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
          content
          gallery {
            gallery {
              sourceUrl(size: GALLERY)
            }
          }
        }
        ... on New {
          id
          slug
          date
          title
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
          content
          gallery {
            gallery {
              sourceUrl(size: GALLERY)
            }
          }
        }
        ... on Project {
          id
          slug
          date
          title
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
          content
          gallery {
            gallery {
              sourceUrl(size: GALLERY)
            }
          }
        }
      }
    }
    
  `,
    {
      variables: {
        id: slug,
      },
    }
  );

  return data.contentNode;
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
