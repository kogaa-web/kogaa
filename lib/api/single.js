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
          table {
            table
          }
          content
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
          table {
            table
          }
          content
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
          table {
            table
          }
          content
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

export async function getGallery(slug, size) {
  const data = await fetchAPI(
    `
    query getGallery($id: ID!, $size: MediaItemSizeEnum) {
      contentNode(id: $id, idType: URI) {
        ... on About {
          gallery {
            gallery {
              sourceUrl(size: $size)
            }
          }
        }
        ... on New {
          gallery {
            gallery {
              sourceUrl(size: $size)
            }
          }
        }
        ... on Project {
          gallery {
            gallery {
              sourceUrl(size: $size)
            }
          }
        }
      }
    }
    
  `,
    {
      variables: {
        id: slug,
        size: size,
      },
    }
  );

  return data.contentNode.gallery.gallery;
}
