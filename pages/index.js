import Head from "next/head";

import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";

// data
import { getAllPosts } from "../lib/api";

// styles
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ allPosts }) {
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(allPosts.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(allPosts.pageInfo.endCursor);

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
    const newPosts = await getAllPosts(endCursor);
    setHasNextPage(newPosts.pageInfo.hasNextPage);
    setEndCursor(newPosts.pageInfo.endCursor);
    const allPosts = [...posts];
    newPosts.edges.map((post) => {
      allPosts.push(post);
    });
    setPosts(allPosts);
  }

  console.log(allPosts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.Cards}>
          {posts.map(({ node }) => (
            <Card post={node} key={node.id} />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const allPosts = await getAllPosts("");
  return {
    props: {
      allPosts,
    },
  };
}
