import fetchAPI from "./fetchApi";
import { stripEmptyNodes } from "../util";

export async function getSupportPosts(category, endCursor, count = 16) {
  switch (category) {
    case "news":
      return await getNews(endCursor, count);
    case "projects":
      return await getProjects(endCursor, count);
    case "about":
      return await getAbouts(endCursor, count);
    default:
      return await getAllPosts(endCursor, count);
  }
}

async function getNews(after, count) {
  const data = await fetchAPI(
    `
    query News($after: String, $count: Int) {
      news(first: $count, after: $after, where: {status: PUBLISH}) {
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
       
    `,
    {
      variables: {
        count: count,
        after: after,
      },
    }
  );

  if (data) {
    return data.news.pageInfo;
  }
}
async function getProjects(after, count) {
  const data = await fetchAPI(
    `
    query Projects($after: String, $count: Int) {
      projects(first: $count, after: $after, where: {status: PUBLISH}) {
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }       
    `,
    {
      variables: {
        count: count,
        after: after,
      },
    }
  );

  if (data) {
    return data.projects.pageInfo;
  }
}
async function getAbouts(after, count) {
  const data = await fetchAPI(
    `
    query Abouts($after: String, $count: Int) {
      abouts(first: $count, after: $after, where: {status: PUBLISH}) {
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }  
    `,
    {
      variables: {
        count: count,
        after: after,
      },
    }
  );

  if (data) {
    return data.abouts.pageInfo;
  }
}
async function getAllPosts(after, count) {
  const data = await fetchAPI(
    `
    query AllPosts($after: String, $count: Int) {
      contentNodes(first: $count, after: $after, where: {status: PUBLISH}) {
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }    
    `,
    {
      variables: {
        count: count,
        after: after,
      },
    }
  );

  if (data) {
    return data.contentNodes.pageInfo;
  }
}

export async function getSupportPostsBySubcategory(
  category,
  subcategory,
  endCursor,
  count = 16
) {
  switch (category) {
    case "news":
      return await getNewsBySubcategory(subcategory, endCursor, count);
    case "projects":
      return await getProjectsBySubcategory(subcategory, endCursor, count);
    case "about":
      return await getAboutsBySubcategory(subcategory, endCursor, count);
    default:
      return;
  }
}

async function getNewsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query News($category: [String], $after: String, $count: Int) {
      news(first: $count, after: $after, where: {taxQuery: {taxArray: {taxonomy: NEWSCAT, operator: IN, terms: $category, field: SLUG}}}) {
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
    return data.news.pageInfo;
  }
}
async function getProjectsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query Projects($category: [String], $after: String, $count: Int) {
      projects(first: $count, after: $after, where: {taxQuery: {taxArray: {taxonomy: PROJECTSCAT, operator: IN, terms: $category, field: SLUG}}}) {
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
    return data.projects.pageInfo;
  }
}
async function getAboutsBySubcategory(category, after) {
  const data = await fetchAPI(
    `
    query Abouts($category: [String], $after: String, $count: Int) {
      abouts(first: $count, after: $after, where: {taxQuery: {taxArray: {taxonomy: ABOUTCAT, operator: IN, terms: $category, field: SLUG}}}) {
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
    return data.abouts.pageInfo;
  }
}

export async function getSlugs() {
  const data = await fetchAPI(`query GetSlugs {
    contentNodes {
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
