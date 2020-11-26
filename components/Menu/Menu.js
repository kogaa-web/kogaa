import { useEffect, useState } from "react";
import Link from "next/link";

import classes from "./Menu.module.css";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import { fetchCategories } from "../../lib/api/listing";
import Subcategories from "./Subcategories/Subcategories";

const Menu = (props) => {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(async () => {
    defaultCategory();
    const subcats = await fetchCategories();
    setCategories(subcats);
  }, []);

  const defaultCategory = () => {
    switch (props.category) {
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
        {categories && category ? (
          <Subcategories categories={categories[category].nodes} />
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
