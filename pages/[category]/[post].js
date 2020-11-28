import Single from "../../containers/Single/Single";
import Category from "../../containers/Category/Category";

// data
import { getSlugs, getPost, getGallery } from "../../lib/api/single";
import { fetchCategories, getNewsBySubcategory } from "../../lib/api/listing";

export default function Page(props) {
  if (props.type == "post") {
    return <Single {...props} />;
  } else {
    return <Category {...props} />;
  }
}

// Get all possible paths
// export async function getServerSidePaths() {
//   const allPosts = await getSlugs();
//   return {
//     paths: allPosts.edges.map(({ node }) => `/${node.slug}`) || [],
//     fallback: true,
//   };
// }

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
    let [
      data,
      gallery320,
      gallery480,
      gallery768,
      gallery1366,
      gallery1440,
      gallery1920,
      gallery4k,
    ] = await Promise.all([
      getPost(params.post),
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
  } else {
    const allPosts = await getNewsBySubcategory(params.post);

    return {
      props: {
        type: pageType,
        category: params.post,
        allPosts,
        subcategories,
      },
    };
  }
}
