import Head from "next/head";
import Category from "../../containers/Category/Category";
import { capitalize } from "../../lib/util";

// data
import { getPosts } from "../../lib/api/listing";
import { fetchCategories } from "../../lib/api/listing";
const Page = (props) => (
  <>
    <Head>
      <title>{`KOGAA - ${capitalize(props.category)}`}</title>
    </Head>
    <Category {...props} />
  </>
);
export default Page;

export async function getServerSideProps({ query: { category } }) {
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
