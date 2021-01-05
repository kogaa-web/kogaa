import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  currentSubcategory,
  subcategories,
  postSubcategories,
  postCategory,
  date,
  error,
}) => {
  const [category, setCategory] = useState(currentCategory);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  if (router.events) {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
  }

  useEffect(async () => {
    if (currentCategory) {
      setCategory(currentCategory);
    }
  }, [currentCategory]);

  useEffect(async () => {
    if (postCategory) {
      setCategory(postCategory);
    }
  }, [postCategory]);

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
    <motion.div
      className={error ? `${classes.Menu} ${classes.Error}` : classes.Menu}
      layoutId="menu"
      {...fadeIn}
    >
      <div onMouseLeave={() => (loading ? null : setCategory(currentCategory))}>
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

        {subcategories && currentCategory ? (
          <Subcategories
            category={category}
            categories={subcategories[categoryIndex].nodes}
            currentSubcategory={currentSubcategory}
            onClick={() => setSelected(true)}
          />
        ) : null}

        {postSubcategories && !currentCategory ? (
          <motion.div className={classes.PostSubcategories} {...fadeIn}>
            <Back />
            {error ? (
              <Link href="/">
                <a>home</a>
              </Link>
            ) : (
              postSubcategories.map((category, index) => {
                return (
                  <Fragment key={category.name}>
                    <Link href={`/${postCategory}/${category.name}`}>
                      <a>{category.name}</a>
                    </Link>
                    {postSubcategories[index + 1] && "|"}
                  </Fragment>
                );
              })
            )}
          </motion.div>
        ) : null}
        {date && !category ? (
          <motion.div {...fadeIn} className={classes.Date}>
            {formatDate(date)}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Menu;
