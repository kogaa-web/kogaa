import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { formatDate } from "../../lib/util";
import { fadeIn } from "../../lib/animations";

import Subcategories from "./Subcategories/Subcategories";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import Back from "../../assets/back.svg";

import classes from "./Menu.module.css";

const Menu = ({
  currentCategory,
  subcategories,
  postSubcategories,
  postCategory,
  date,
}) => {
  const [category, setCategory] = useState(null);

  useEffect(async () => {
    () => setCategory(currentCategory);
  }, [currentCategory]);

  let categoryIndex = null;
  switch (category) {
    case "news":
      categoryIndex = "newsCats";
      break;
    case "projects":
      categoryIndex = "projectsCats";
      break;
    default:
      categoryIndex = "aboutCats";
      break;
  }

  return (
    <motion.div className={classes.Menu} layoutId="menu" {...fadeIn}>
      <div onMouseLeave={() => setCategory(currentCategory)}>
        <div className={classes.MainMenu}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Link href="/news">
            <a onMouseEnter={() => setCategory("news")}>
              <Circle className={category === "news" ? classes.Active : null} />
            </a>
          </Link>
          <Link href="/projects">
            <a onMouseEnter={() => setCategory("projects")}>
              <Square
                className={category === "projects" ? classes.Active : null}
              />
            </a>
          </Link>
          <Link href="/about">
            <a onMouseEnter={() => setCategory("about")}>
              <Triangle
                className={category === "about" ? classes.Active : null}
              />
            </a>
          </Link>
        </div>

        {subcategories && category ? (
          <Subcategories
            category={category}
            categories={subcategories[categoryIndex].nodes}
          />
        ) : null}

        {postSubcategories && !category ? (
          <div className={classes.PostSubcategories}>
            <Back />
            {postSubcategories.map((category, index) => {
              return (
                <Fragment key={category.name}>
                  <Link href={`/${postCategory}/${category.name}`}>
                    <a>{category.name}</a>
                  </Link>
                  {postSubcategories[index + 1] && "|"}
                </Fragment>
              );
            })}
          </div>
        ) : null}
        {date && !category ? (
          <div className={classes.Date}>{formatDate(date)}</div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Menu;
