import { useEffect, useState, Fragment } from "react";
import Link from "next/link";

import classes from "./Menu.module.css";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import Back from "../../assets/back.svg";
import Subcategories from "./Subcategories/Subcategories";
import { formatDate } from "../../lib/util";

const Menu = ({
  currentCategory,
  subcategories,
  postSubcategories,
  postCategory,
  date,
}) => {
  const [category, setCategory] = useState(null);

  useEffect(async () => {
    defaultCategory();
  }, [currentCategory]);

  const defaultCategory = () => {
    switch (currentCategory) {
      case "news":
        setCategory("newsCats");
        break;
      case "projects":
        setCategory("projectsCats");
        break;
      case "about":
        setCategory("aboutCats");
        break;
      default:
        setCategory(null);
        break;
    }
  };

  return (
    <div className={classes.Menu}>
      <div onMouseLeave={defaultCategory}>
        <div className={classes.MainMenu}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <Link href="/news">
            <a onMouseEnter={() => setCategory("newsCats")}>
              <Circle
                className={category === "newsCats" ? classes.Active : null}
              />
            </a>
          </Link>
          <Link href="/projects">
            <a onMouseEnter={() => setCategory("projectsCats")}>
              <Square
                className={category === "projectsCats" ? classes.Active : null}
              />
            </a>
          </Link>
          <Link href="/about">
            <a onMouseEnter={() => setCategory("aboutCats")}>
              <Triangle
                className={category === "aboutCats" ? classes.Active : null}
              />
            </a>
          </Link>
        </div>
        {subcategories && category ? (
          <Subcategories categories={subcategories[category].nodes} />
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
    </div>
  );
};

export default Menu;
