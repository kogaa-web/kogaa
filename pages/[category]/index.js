import Head from "next/head";

import { capitalize } from "../../lib/util";

import Category from "../../containers/Category/Category";
import Error from "../../containers/Error/Error";

// data
import { getPosts } from "../../lib/api/listing";
import { fetchCategories } from "../../lib/api/listing";
const Page = (props) => {
  return props.error ? (
    <Error />
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
  let [allPosts, subcategories] = await Promise.all([
    getPosts(category),
    fetchCategories(),
  ]);
  if (!allPosts) {
    return {
      props: {
        error: true,
      },
    };
  }
  return {
    props: {
      category,
      allPosts,
      subcategories,
    },
  };
}
