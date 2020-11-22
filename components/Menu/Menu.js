import { useEffect, useState } from "react";
import Link from "next/link";

import classes from "./Menu.module.css";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import { fetchCategories } from "../../lib/api";
import Subcategories from "./Subcategories/Subcategories";

export default function menu() {
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(async () => {
    if (!categories) {
      const subcats = await fetchCategories();
      setCategories(subcats);
    }
  });

  return (
    <>
      <div className={classes.MainMenu}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <Link href="/news">
          <a
            onMouseEnter={() => setCategory("newsCats")}
            onMouseLeave={() => setCategory(null)}
          >
            <Circle
              className={category === "newsCats" ? classes.Active : null}
            />
          </a>
        </Link>
        <Link href="/projects">
          <a
            onMouseEnter={() => setCategory("projectsCats")}
            onMouseLeave={() => setCategory(null)}
          >
            <Square
              className={category === "projectsCats" ? classes.Active : null}
            />
          </a>
        </Link>
        <Link href="/about">
          <a
            onMouseEnter={() => setCategory("aboutCats")}
            onMouseLeave={() => setCategory(null)}
          >
            <Triangle
              className={category === "aboutCats" ? classes.Active : null}
            />
          </a>
        </Link>
      </div>
      {categories && category ? (
        <Subcategories categories={categories[category].nodes} />
      ) : null}
    </>
  );
}
