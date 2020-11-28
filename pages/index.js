import Category from "../containers/Category/Category";

// data
import { getPosts, fetchCategories } from "../lib/api/listing";

const Page = (props) => <Category {...props} />;
export default Page;

export async function getServerSideProps() {
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
