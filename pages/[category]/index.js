import Head from "next/head";
import Category from "../../containers/Category/Category";
import Error from "../../containers/Error/Error";
import { fetchCategories, getPosts } from "../../lib/api/listing";
import { capitalize } from "../../lib/util";

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

export async function getStaticPaths() {
  return {
    paths: ["/news", "/projects", "/about"],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const possiblePaths = ["news", "projects", "about", null];
  if (!possiblePaths.includes(params.category)) {
    const errorSubcategories = await fetchCategories();
    return { props: { error: true, subcategories: errorSubcategories } };
  }

  let [allPosts, subcategories] = await Promise.all([
    getPosts(params.category),
    fetchCategories(),
  ]);

  return {
    props: {
      category: params.category,
      allPosts,
      subcategories,
    },
  };
}
