import Head from "next/head";

import { getPosts, fetchCategories } from "../lib/api/listing";

import Category from "../containers/Category/Category";

const Page = (props) => (
  <>
    <Head>
      <title>KOGAA</title>
    </Head>
    {/* <Category {...props} /> */}
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "#ef4123", textAlign: "center" }}>
        KOGAA page is under construction
      </h1>
    </div>
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
