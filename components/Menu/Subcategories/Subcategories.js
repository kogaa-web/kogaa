import Link from "next/link";
import { motion } from "framer-motion";

import { fadeIn } from "../../../lib/animations";

import classes from "./Subcategories.module.css";

const Subcategories = ({ category, categories }) => (
  <div className={classes.Subcategories}>
    {categories.map((item) => {
      return (
        <Link href={`/${category}/${item.name}`} key={item.name}>
          <motion.a {...fadeIn} layoutId={item.name + "menuitem"}>
            {item.name}
          </motion.a>
        </Link>
      );
    })}
  </div>
);

export default Subcategories;
