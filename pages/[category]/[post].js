import React from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";

// data
import { getSlugs, getPost } from "../../lib/api/single";

// styles
import styles from "../../styles/Home.module.css";
import singleStyles from "../../styles/Single.module.css";

export default function Post({ postData }) {
  const router = useRouter();

  if ((!router.isFallback && !postData?.slug) || !postData) {
    return <p>post error</p>;
  }

  console.log(postData);
  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {postData.gallery.gallery ? (
          <Gallery images={postData.gallery.gallery} />
        ) : null}
        <h1>{postData.title}</h1>
        {postData.role ? (
          <p>
            <strong>{postData.role.role}</strong>
          </p>
        ) : null}
        <div
          className={singleStyles.Content}
          dangerouslySetInnerHTML={{ __html: postData.content }}
        ></div>
      </Layout>
    </div>
  );
}

// Get all possible paths
export async function getServerSidePaths() {
  const allPosts = await getSlugs();
  return {
    paths: allPosts.edges.map(({ node }) => `/${node.slug}`) || [],
    fallback: true,
  };
}

// Get data for current post by slug
export async function getServerSideProps({ params }) {
  console.log(params.post);
  const data = await getPost(params.post);
  return {
    props: {
      postData: data,
    },
  };
}
