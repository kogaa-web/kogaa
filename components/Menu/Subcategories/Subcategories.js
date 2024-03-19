import { motion } from "framer-motion";
import Link from "next/link";

import { fadeIn } from "../../../lib/animations";

import classes from "./Subcategories.module.css";

const Subcategories = ({ category, categories, currentSubcategory }) => (
  <div className={classes.Subcategories}>
    {categories.map((item) => {
      return (
        <Link href={`/${category}/${item.name}`} key={item.name}>
          <motion.span
            {...fadeIn}
            layoutId={item.name + "menuitem"}
            className={currentSubcategory === item.name ? classes.Active : null}
          >
            {item.name}
          </motion.span>
        </Link>
      );
    })}
  </div>
);

export default Subcategories;
