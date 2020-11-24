import fetchAPI from "./fetchApi";
import { stripEmptyNodes } from "../util";

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

export async function getSlugs() {
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
