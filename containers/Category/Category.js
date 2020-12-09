import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { motion } from "framer-motion";

import { getPosts } from "../../lib/api/listing";
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
}) => {
  const router = useRouter();
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(reduxPosts ? reduxPosts : allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(allPosts.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(allPosts.pageInfo.endCursor);
  const [numberOfPosts, setNumberOfPosts] = useState(10);
  const [rendered, setRendered] = useState(reduxPosts ? true : false);

  const windowWidth = useWindowSize().width;
  console.log(windowWidth);
  if (windowWidth && !rendered) {
    console.log("windowWidth", windowWidth);
    let count = numberOfPosts;
    if (windowWidth >= 768 && windowWidth <= 1024) {
      count = 16;
    } else if (windowWidth >= 1366) {
      count = 15;
    }
    setNumberOfPosts(count);
    setPosts((currentPosts) => currentPosts.slice(0, count));
    setRendered(true);
  }

  console.log("posts", posts);
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
    if (scrollPosition >= siteHeight && !loadingMore && hasNextPage) {
      setLoadingMore(true);
      loadMorePosts();
    }
  };

  async function loadMorePosts() {
    console.log("category", category);
    console.log("endCursor", endCursor);
    console.log("numberOfPosts", numberOfPosts);
    const newPosts = await getPosts(category, endCursor, numberOfPosts);
    console.log("newPosts:", newPosts);
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
        {rendered ? (
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
