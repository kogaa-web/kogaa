import Head from "next/head";

import Category from "../containers/Category/Category";

// data
import { getPosts, fetchCategories } from "../lib/api/listing";

const Page = (props) => (
  <>
    <Head>
      <title>KOGAA</title>
    </Head>
    <Category {...props} />
  </>
);
export default Page;

export async function getStaticProps() {
  let [allPosts, subcategories] = await Promise.all([
    getPosts("all"),
    fetchCategories(),
  ]);

  return {
    props: {
      allPosts,
      subcategories,
    },
  };
}
