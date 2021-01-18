import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";

import { getPosts, getPostsBySubcategory } from "../../lib/api/listing";
import {
  getSupportPosts,
  getSupportPostsBySubcategory,
} from "../../lib/api/support";
import * as actions from "../../redux/actions";
import { useWindowSize } from "../../lib/hooks";

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
}) => {
  const router = useRouter();
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(reduxPosts ? reduxPosts : allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [rendered, setRendered] = useState(false);
  const [firstTimeRendered, setFirstTimeRendered] = useState(false);

  const windowWidth = useWindowSize().width;

  // Sets posts on page change
  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
    setPosts(allPosts.edges);
    setReduxPosts(allPosts.edges);
    calculateNumberOfPosts();
  }, [router.query]);

  useEffect(() => {
    if (!reduxPosts) {
      setFirstTimeRendered(true);
    }
  }, []);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  const calculateNumberOfPosts = () => {
    // Change number of posts according to screen size
    let count = numberOfPosts;
    if (windowWidth >= 640 && windowWidth < 1200) {
      count = 16;
    } else if (windowWidth >= 1200) {
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
  };

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
    setLoadingMore(false);
  }
  if (windowWidth && !rendered) {
    calculateNumberOfPosts();
  }

  return (
    <div className={styles.container}>
      <Layout
        currentCategory={category}
        subcategories={subcategories}
        currentSubcategory={subcategory}
      >
        {rendered || reduxPosts ? (
          <div
            // enterAnimation="fade"
            // leaveAnimation="fade"
            // duration={400}
            className={
              firstTimeRendered
                ? [styles.Cards, globalStyles.FadeIn].join(" ")
                : styles.Cards
            }
          >
            {posts.map(({ node }) =>
              node.featuredImage ? <Card post={node} key={node.id} /> : null
            )}
          </div>
        ) : null}
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
