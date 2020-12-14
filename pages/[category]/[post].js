import Head from "next/head";

import Single from "../../containers/Single/Single";
import Category from "../../containers/Category/Category";
import Error from "../../containers/Error/Error";
import { capitalize } from "../../lib/util";

// data
import { getPost, getGallery } from "../../lib/api/single";
import { fetchCategories, getPostsBySubcategory } from "../../lib/api/listing";
import { getSlugs } from "../../lib/api/support";

export default function Page(props) {
  switch (props.type) {
    case "post":
      return <Single {...props} />;
    case "category":
      return (
        <>
          <Head>
            <title>{`KOGAA - ${capitalize(props.category)}`}</title>
          </Head>
          <Category {...props} />
        </>
      );
    default:
      return <Error subcategories={props.subcategories} />;
  }
}

export async function getStaticPaths() {
  const paths = [];
  // Get all possible subcategories paths
  const categories = await fetchCategories();
  for (const category in categories) {
    categories[category].nodes.map((element) => {
      let paramsCategory = null;
      switch (category) {
        case "newsCats":
          paramsCategory = "news";
          break;
        case "projectsCats":
          paramsCategory = "projects";
        default:
          paramsCategory = "about";
          break;
      }
      paths.push({ params: { category: paramsCategory, post: element.name } });
    });
  }
  // Get all possible post paths
  const posts = await getSlugs();
  posts.map((post) => {
    paths.push({
      params: {
        category: post.node.contentType.node.name,
        post: post.node.slug,
      },
    });
  });
  // Set all possible paths
  return {
    paths: paths,
    fallback: false,
  };
}

// Get data for current post by slug
export async function getStaticProps({ params }) {
  const subcategories = await fetchCategories();

  let currentSubcategories = null;
  switch (params.category) {
    case "news":
      currentSubcategories = { ...subcategories.newsCats };
      break;
    case "projects":
      currentSubcategories = { ...subcategories.projectsCats };
      break;
    default:
      currentSubcategories = { ...subcategories.aboutCats };
      break;
  }

  let pageType = "post";
  currentSubcategories.nodes.some((category) => {
    if (params.post == category.name) {
      pageType = "category";
      return true;
    }
  });

  if (pageType == "post") {
    const data = await getPost(params.post);
    if (!data) {
      return {
        props: {
          type: "error",
          subcategories,
        },
      };
    }
    let [
      gallery320,
      gallery480,
      gallery768,
      gallery1366,
      gallery1440,
      gallery1920,
      gallery4k,
    ] = await Promise.all([
      getGallery(params.post, "GALLERY_320"),
      getGallery(params.post, "GALLERY_480"),
      getGallery(params.post, "GALLERY_768"),
      getGallery(params.post, "GALLERY_1366"),
      getGallery(params.post, "GALLERY_1440"),
      getGallery(params.post, "GALLERY_1920"),
      getGallery(params.post, "GALLERY_4K"),
    ]);
    return {
      props: {
        type: pageType,
        postData: data,
        subcategories,
        gallery: {
          gallery320,
          gallery480,
          gallery768,
          gallery1366,
          gallery1440,
          gallery1920,
          gallery4k,
        },
      },
    };
  } else if (pageType == "category") {
    const allPosts = await getPostsBySubcategory(
      params.category,
      params.post,
      ""
    );
    return {
      props: {
        type: pageType,
        category: params.category,
        subcategory: params.post,
        allPosts,
        subcategories,
      },
    };
  }
}
