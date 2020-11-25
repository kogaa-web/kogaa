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

export async function getGallery(slug) {
  const data = await fetchAPI(
    `
    query GetContentNode($id: ID!) {
      contentNode(id: $id, idType: URI) {
        ... on About {
          gallery {
            gallery {
              sourceUrl(size: GALLERY_FULLHD)
            }
          }
        }
        ... on New {
          gallery {
            gallery {
              sourceUrl(size: GALLERY_FULLHD)
            }
          }
        }
        ... on Project {
          gallery {
            gallery {
              sourceUrl(size: GALLERY_FULLHD)
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

  return data.contentNode.gallery.gallery;
}
