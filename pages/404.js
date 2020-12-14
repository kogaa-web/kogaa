import { fetchCategories } from "../lib/api/listing";
import Error from "../containers/Error/Error";

const ErrorPage = ({ subcategories }) => (
  <Error subcategories={subcategories} />
);

export default ErrorPage;

export async function getStaticProps() {
  const subcategories = await fetchCategories();
  return {
    props: {
      subcategories,
    },
  };
}
