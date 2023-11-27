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
  reduxBack,
  setReduxHasNextPage,
  reduxHasNextPage,
  setReduxEndCursor,
  reduxEndCursor,
  setReduxFromSingle,
  reduxFromSingle,
}) => {
  const router = useRouter();

  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(
    (reduxPosts && !reduxFromSingle) || (reduxPosts && reduxBack)
      ? reduxPosts
      : allPosts.edges
  );
  const [hasNextPage, setHasNextPage] = useState(allPosts.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(allPosts.pageInfo.endCursor);
  const [firstTimeRendered, setFirstTimeRendered] = useState(false);

  // Sets posts on page change
  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
    // Disable regrouping animation if navigated from single page but not from back arrow
    if (reduxFromSingle && !reduxBack) {
      setFirstTimeRendered(true);
      setReduxFromSingle(false);
    }
    // If loaded from back arrow click
    if (reduxPosts && reduxBack) {
      setHasNextPage(reduxHasNextPage);
      setEndCursor(reduxEndCursor);
    } else {
      setPosts(allPosts.edges);
      setHasNextPage(allPosts.pageInfo.hasNextPage);
      setEndCursor(allPosts.pageInfo.endCursor);
      setReduxPosts(allPosts.edges);
      setReduxHasNextPage(allPosts.pageInfo.hasNextPage);
      setReduxEndCursor(allPosts.pageInfo.endCursor);
    }
    if (process.browser) {
      setReduxScroll(window.scrollY);
    }
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, [router.query]);

  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

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
    setReduxHasNextPage(newPosts.pageInfo.hasNextPage);
    setReduxEndCursor(newPosts.pageInfo.endCursor);
    const allPosts = [...posts];
    newPosts.edges.map((post) => {
      allPosts.push(post);
    });
    setPosts(allPosts);
    setReduxPosts(allPosts);
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
  reduxHasNextPage: state.hasNextPage,
  reduxEndCursor: state.endCursor,
  reduxFromSingle: state.fromSingle,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
  setReduxScroll: (scrollPosition) =>
    dispatch(actions.setReduxScroll(scrollPosition)),
  setReduxHasNextPage: (hasNextPage) =>
    dispatch(actions.setReduxHasNextPage(hasNextPage)),
  setReduxEndCursor: (endCursor) =>
    dispatch(actions.setReduxEndCursor(endCursor)),
  setReduxFromSingle: (fromSingle) =>
    dispatch(actions.setReduxFromSingle(fromSingle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
