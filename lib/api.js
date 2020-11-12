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

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      contentNodes(first: 15) {
        edges {
          node {
            ... on Post {
              id
              slug
              date
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                }
              }
              contentType {
                node {
                  name
                }
              }
            }
            ... on Architect {
              id
              slug
              date
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                }
              }
              contentType {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }    
    `
  );

  if (data) {
    return stripEmptyNodes(data);
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
    return stripEmptyNodes(data);
  }
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
    query GetContentNode($id: ID!) {
      contentNode(id: $id, idType: URI) {
        ... on Architect {
          id
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          gallery {
            gallery {
              sourceUrl(size: GALLERY)
            }
          }
          content
          role {
            role
          }
        }
        ... on Post {
          id
          title
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          gallery {
            gallery {
              sourceUrl(size: GALLERY)
            }
          }
          content
          extraPostInfo {
            budget
            client
            fieldGroupName
            location
            project
            realisation
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
