import { useEffect, useState, Fragment, forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import { formatDate, iOS } from "../../lib/util";
import { fadeIn } from "../../lib/animations";
import * as actions from "../../redux/actions";

import Subcategories from "./Subcategories/Subcategories";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";
import Back from "../../assets/back.svg";

import classes from "./Menu.module.css";

const Menu = forwardRef(
  (
    {
      currentCategory,
      currentSubcategory,
      subcategories,
      postSubcategories,
      postCategory,
      date,
      error,
      setReduxBack,
      reduxScroll,
    },
    ref
  ) => {
    const [category, setCategory] = useState(currentCategory);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    if (router.events) {
      router.events.on("routeChangeStart", () => setLoading(true));
      router.events.on("routeChangeComplete", () => setLoading(false));
      router.events.on("routeChangeError", () => setLoading(false));
    }

    useEffect(() => {
      if (currentCategory) {
        setCategory(currentCategory);
      }
    }, [currentCategory]);

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
      setReduxBack(reduxScroll);
      router.back();
    };

    return (
      <div ref={ref}>
        <div className={classes.Menu}>
          <div
            onMouseLeave={() =>
              loading ? null : setCategoryOnHover(currentCategory)
            }
          >
            <div className={classes.MainMenu}>
              <Link href="/">
                <a>
                  <Logo />
                </a>
              </Link>
              <Link href="/news">
                <a onMouseEnter={() => setCategoryOnHover("news")}>
                  <Circle
                    className={category === "news" ? classes.Active : null}
                  />
                </a>
              </Link>
              <Link href="/projects">
                <a onMouseEnter={() => setCategoryOnHover("projects")}>
                  <Square
                    className={category === "projects" ? classes.Active : null}
                  />
                </a>
              </Link>
              <Link href="/about">
                <a onMouseEnter={() => setCategoryOnHover("about")}>
                  <Triangle
                    className={category === "about" ? classes.Active : null}
                  />
                </a>
              </Link>
            </div>

            {subcategories && category && !postSubcategories ? (
              <Subcategories
                category={category}
                categories={subcategories[categoryIndex].nodes}
                currentSubcategory={currentSubcategory}
                onClick={() => setSelected(true)}
              />
            ) : null}

            <motion.div style={{ background: "white" }} {...fadeIn}>
              {postSubcategories && !currentCategory ? (
                <motion.div className={classes.PostSubcategories} {...fadeIn}>
                  <Back
                    onClick={onBackArrowClick}
                    style={{ cursor: "pointer" }}
                  />
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
              {date && !currentCategory ? (
                <motion.div {...fadeIn} className={classes.Date}>
                  {formatDate(date)}
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

const mapStateToProps = (state) => ({
  reduxScroll: state.scroll,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxBack: (back) => dispatch(actions.setReduxBack(back)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Menu);
