import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { motion } from "framer-motion";

import { getPosts, getPostsBySubcategory } from "../../lib/api/listing";
import {
  getSupportPosts,
  getSupportPostsBySubcategory,
} from "../../lib/api/support";
import { fadeIn } from "../../lib/animations";
import * as actions from "../../redux/actions";
import { useWindowSize } from "../../lib/hooks";

import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";
import Line from "../../components/Line/Line";

import styles from "./Category.module.css";

const Category = ({
  category,
  subcategories,
  allPosts,
  reduxPosts,
  setReduxPosts,
  subcategory,
}) => {
  const router = useRouter();
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(reduxPosts ? reduxPosts : allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [rendered, setRendered] = useState(false);

  const windowWidth = useWindowSize().width;
  if (windowWidth && !rendered) {
    // Change number of posts accrding to screen size
    let count = numberOfPosts;
    if (windowWidth >= 640 && windowWidth < 1366) {
      count = 16;
    } else if (windowWidth >= 1366) {
      count = 15;
    }

    if (count != 16) {
      // Remove unnecessary posts
      setPosts((currentPosts) => currentPosts.slice(0, count));
      // Run query to fetch corect endCursor
      loadSupportQuery(count);
    } else {
      // Set original endCursor
      setHasNextPage(allPosts.pageInfo.hasNextPage);
      setEndCursor(allPosts.pageInfo.endCursor);
    }

    setNumberOfPosts(count);
    setRendered(true);
  }

  async function loadSupportQuery(count) {
    // Fetches only pageInfo object
    let supportQuery = null;
    if (subcategory) {
      supportQuery = await getSupportPostsBySubcategory(
        category,
        subcategory,
        null,
        count
      );
    } else {
      supportQuery = await getSupportPosts(category, null, count);
    }
    setHasNextPage(supportQuery.hasNextPage);
    setEndCursor(supportQuery.endCursor);
  }

  console.log("posts", posts);
  // Sets posts on page change
  useEffect(() => {
    setPosts(allPosts.edges);
    setReduxPosts(allPosts.edges);
  }, [router.query]);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
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
      newPosts = await getPostsBySubcategory(
        category,
        subcategory,
        endCursor,
        numberOfPosts
      );
    } else {
      newPosts = await getPosts(category, endCursor, numberOfPosts);
    }
    setHasNextPage(newPosts.pageInfo.hasNextPage);
    setEndCursor(newPosts.pageInfo.endCursor);
    const allPosts = [...posts];
    newPosts.edges.map((post) => {
      allPosts.push(post);
    });
    setPosts(allPosts);
  }

  return (
    <div className={styles.container}>
      <Layout currentCategory={category} subcategories={subcategories}>
        {rendered || reduxPosts ? (
          <FlipMove
            enterAnimation="fade"
            leaveAnimation="fade"
            duration={300}
            className={styles.Cards}
          >
            {posts.map(({ node }) => (
              <Card post={node} key={node.id} />
            ))}
          </FlipMove>
        ) : null}

        <Line />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reduxPosts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
