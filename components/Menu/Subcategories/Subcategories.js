import Link from "next/link";

import classes from "./Subcategories.module.css";

const Subcategories = ({ categories }) => (
  <div className={classes.Subcategories}>
    {categories.map((category) => {
      return (
        <Link href={`/${category.name}`} key={category.name}>
          <a>{category.name}</a>
        </Link>
      );
    })}
  </div>
);

export default Subcategories;
