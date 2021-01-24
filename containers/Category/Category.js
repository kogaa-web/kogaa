import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";

import { getPosts, getPostsBySubcategory } from "../../lib/api/listing";
import * as actions from "../../redux/actions";

import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";

import styles from "./Category.module.css";
import globalStyles from "../../styles/Global.module.css";

const Category = ({
  category,
  subcategories,
  allPosts,
  reduxPosts,
  setReduxPosts,
  subcategory,
  setReduxScroll,
  setReduxBack,
  reduxBack,
}) => {
  console.log("reduxBack", reduxBack);
  const router = useRouter();

  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(reduxPosts ? reduxPosts : allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(allPosts.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(allPosts.pageInfo.endCursor);
  const [firstTimeRendered, setFirstTimeRendered] = useState(false);

  // Sets posts on page change
  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
    setPosts(allPosts.edges);
    setReduxPosts(allPosts.edges);
    setHasNextPage(allPosts.pageInfo.hasNextPage);
    setEndCursor(allPosts.pageInfo.endCursor);
    if (process.browser) {
      setReduxScroll(window.scrollY);
    }
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, [router.query]);
  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
    if (process.browser) {
      if (reduxBack) {
        console.log(reduxBack);
        window.scrollTo(0, reduxBack);
        setReduxBack(null);
      }
    }
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
    setReduxScroll(window.scrollY);
    const siteHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight * 2;
    if (
      scrollPosition >= siteHeight &&
      !loadingMore &&
      hasNextPage &&
      endCursor
    ) {
      setLoadingMore(true);
      loadMorePosts();
    }
  };

  async function loadMorePosts() {
    let newPosts = null;
    if (subcategory) {
      newPosts = await getPostsBySubcategory(category, subcategory, endCursor);
    } else {
      newPosts = await getPosts(category, endCursor);
    }
    setHasNextPage(newPosts.pageInfo.hasNextPage);
    setEndCursor(newPosts.pageInfo.endCursor);
    const allPosts = [...posts];
    newPosts.edges.map((post) => {
      allPosts.push(post);
    });
    setPosts(allPosts);
    setLoadingMore(false);
  }

  return (
    <div className={styles.container}>
      <Layout
        currentCategory={category}
        subcategories={subcategories}
        currentSubcategory={subcategory}
      >
        {firstTimeRendered || reduxPosts ? (
          <FlipMove
            enterAnimation="fade"
            leaveAnimation="fade"
            duration={400}
            className={
              firstTimeRendered
                ? [styles.Cards, globalStyles.FadeIn].join(" ")
                : styles.Cards
            }
          >
            {posts.map(({ node }) =>
              node.featuredImage ? <Card post={node} key={node.id} /> : null
            )}
          </FlipMove>
        ) : null}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reduxPosts: state.posts,
  reduxScroll: state.scroll,
  reduxBack: state.back,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
  setReduxScroll: (scrollPosition) =>
    dispatch(actions.setReduxScroll(scrollPosition)),
  setReduxBack: (back) => dispatch(actions.setReduxBack(back)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
