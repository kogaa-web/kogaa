import Category from "../../containers/Category/Category";

// data
import { getPosts } from "../../lib/api/listing";
import { fetchCategories } from "../../lib/api/listing";

const Page = (props) => <Category {...props} />;
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
