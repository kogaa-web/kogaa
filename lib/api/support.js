import fetchAPI from "./fetchApi";
import { stripEmptyNodes } from "../util";

export async function getSlugs() {
  const data = await fetchAPI(`query GetSlugs {
    contentNodes(first: 99999999) {
      edges {
        node {
          slug
          ... on About {
            contentType {
              node {
                name
              }
            }
          }
          ... on New {
            contentType {
              node {
                name
              }
            }
          }
          ... on Project {
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
  `);
  if (data) {
    return stripEmptyNodes(data.contentNodes).edges;
  }
}
