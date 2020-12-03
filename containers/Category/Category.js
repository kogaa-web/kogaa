import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import FlipMove from "react-flip-move";

import * as actions from "../../redux/actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";

// data
import { getPosts } from "../../lib/api/listing";

// styles
import styles from "./Category.module.css";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    console.log("reduxPosts:", reduxPosts);
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
    const newPosts = await getPosts(category, endCursor);
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
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout currentCategory={category} subcategories={subcategories}>
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
