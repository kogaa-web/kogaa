import Head from "next/head";

import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";

// data
import { getAllPosts } from "../lib/api";

// styles
import styles from "../styles/Home.module.css";

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {allPosts.map(({ node }) => (
          <Card post={node} key={node.id} />
        ))}
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
