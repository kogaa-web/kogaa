import Head from "next/head";

import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";

// data
import { getAllPosts } from "../lib/api";

// styles
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home({ allPosts }) {
  // window.addEventListener("scroll", onScrollHandler);

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  const [loadingMore, setLoadingMore] = useState(false);
  const [enoughPosts, setEnoughPosts] = useState(false);

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
    const siteHeight = document.body.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight * 2;
    if (scrollPosition >= siteHeight && !loadingMore && !enoughPosts) {
      setLoadingMore(true);
      console.log("Load more posts");
    }
  };

  console.log(allPosts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.Cards}>
          {allPosts.map(({ node }) => (
            <Card post={node} key={node.id} />
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
