import Link from "next/link";

import classes from "./Subcategories.module.css";

const Subcategories = ({ category, categories }) => (
  <div className={classes.Subcategories}>
    {categories.map((item) => {
      return (
        <Link href={`/${category}/${item.name}`} key={item.name}>
          <a>{item.name}</a>
        </Link>
      );
    })}
  </div>
);

export default Subcategories;
