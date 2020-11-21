import { useState } from "react";
import Link from "next/link";

import classes from "./Menu.module.css";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import { fetchCategories } from "../../lib/api";
import Subcategories from "./Subcategories/Subcategories";

export default function menu({ categories }) {
  console.log(categories);
  const [category, setCategory] = useState(null);

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
      {/*category ? <Subcategories categories={categories[category]} /> : null*/}
    </>
  );
}

export async function getServerSideProps() {
  const categories = await fetchCategories();
  return {
    props: {
      categories,
    },
  };
}
