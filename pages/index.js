import Head from "next/head";

import { getPosts, fetchCategories } from "../lib/api/listing";

import Category from "../containers/Category/Category";

const Page = (props) => {
  console.log({ props });
  return (
    <>
      <Head>
        <title>KOGAA</title>
      </Head>
      <Category {...props} />
    </>
  );
};
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
