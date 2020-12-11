import Head from "next/head";

import { capitalize } from "../../lib/util";

import Category from "../../containers/Category/Category";
import Error from "../../containers/Error/Error";

// data
import { getPosts } from "../../lib/api/listing";
import { fetchCategories } from "../../lib/api/listing";
const Page = (props) => {
  return props.error ? (
    <Error subcategories={props.subcategories} />
  ) : (
    <>
      <Head>
        <title>{`KOGAA - ${capitalize(props.category)}`}</title>
      </Head>
      <Category {...props} />
    </>
  );
};
export default Page;

export async function getServerSideProps({ query: { category } }) {
  const possiblePaths = ["news", "projects", "about", null];
  if (!possiblePaths.includes(category)) {
    const errorSubcategories = await fetchCategories();
    return { props: { error: true, subcategories: errorSubcategories } };
  }

  let [allPosts, subcategories] = await Promise.all([
    getPosts(category),
    fetchCategories(),
  ]);
  return {
    props: {
      category,
      allPosts,
      subcategories,
    },
  };
}
