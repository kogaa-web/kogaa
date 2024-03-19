import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, forwardRef, useEffect, useState } from "react";
import { fadeIn } from "../../lib/animations";
import { formatDate, iOS } from "../../lib/util";
import Back from "../../assets/back.svg";
import Circle from "../../assets/circle.svg";
import Logo from "../../assets/kogaa-logo.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import Subcategories from "./Subcategories/Subcategories";
import classes from "./Menu.module.css";

const Menu = forwardRef(
  (
    { subcategories, postCategory, date, postSubcategories, error, pageType },
    ref
  ) => {
    const router = useRouter();
    const [category, setCategory] = useState(router.query?.category);
    const [loading, setLoading] = useState(false);

    if (router.events) {
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeComplete", () => setLoading(false));
      router.events.on("routeChangeError", () => setLoading(false));
    }

    useEffect(() => {
      setCategory(router.query?.category || null);
    }, [router.query?.category]);

    useEffect(() => {
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

    const setCategoryOnHover = (category) => {
      if (!iOS()) {
        setCategory(category);
      }
    };

    const onBackArrowClick = () => {
      router.back();
    };

    return (
      <div ref={ref}>
        <div className={classes.Menu}>
          <div
            onMouseLeave={() => {
              loading
                ? null
                : setCategoryOnHover(router.pathname === "/" ? null : category);
            }}
          >
            <div className={classes.MainMenu}>
              <Link href="/">
                <Logo />
              </Link>
              <Link
                href="/news"
                onMouseEnter={() => setCategoryOnHover("news")}
              >
                <Circle
                  className={category === "news" ? classes.Active : null}
                />
              </Link>
              <Link
                href="/projects"
                onMouseEnter={() => setCategoryOnHover("projects")}
              >
                <Square
                  className={category === "projects" ? classes.Active : null}
                />
              </Link>
              <Link
                href="/about"
                onMouseEnter={() => setCategoryOnHover("about")}
              >
                <Triangle
                  className={category === "about" ? classes.Active : null}
                />
              </Link>
            </div>

            {subcategories && category && !postSubcategories ? (
              <Subcategories
                category={category}
                categories={subcategories[categoryIndex].nodes}
                currentSubcategory={router.query?.post}
                onClick={() => setSelected(true)}
              />
            ) : null}

            <motion.div style={{ background: "white" }} {...fadeIn}>
              {pageType === "post" ? (
                <>
                  <motion.div className={classes.PostSubcategories} {...fadeIn}>
                    <Back
                      onClick={onBackArrowClick}
                      style={{ cursor: "pointer" }}
                    />
                    {error ? (
                      <Link href="/">home</Link>
                    ) : (
                      postSubcategories.map((category, index) => {
                        return (
                          <Fragment key={category.name}>
                            <Link href={`/${postCategory}/${category.name}`}>
                              {category.name}
                            </Link>
                            {postSubcategories[index + 1] && "|"}
                          </Fragment>
                        );
                      })
                    )}
                  </motion.div>
                  {date && (
                    <motion.div {...fadeIn} className={classes.Date}>
                      {formatDate(date)}
                    </motion.div>
                  )}
                </>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

export default Menu;
