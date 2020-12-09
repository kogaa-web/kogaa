import Head from "next/head";

import Single from "../../containers/Single/Single";
import Category from "../../containers/Category/Category";
import Error from "../../containers/Error/Error";
import { capitalize } from "../../lib/util";

// data
import { getPost, getGallery } from "../../lib/api/single";
import { fetchCategories, getPostsBySubcategory } from "../../lib/api/listing";

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
      return <Error />;
  }
}

// Get data for current post by slug
export async function getServerSideProps({ params }) {
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
    console.log(data);
    if (!data) {
      return {
        props: {
          type: "error",
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
