import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";

// data
import { getSlugs, getPost, getGallery } from "../../lib/api/single";

// styles
import styles from "../../styles/Home.module.css";
import singleStyles from "../../styles/Single.module.css";

export default function Post({ postData, gallery }) {
  console.log(gallery);
  // const [images, setImages] = useState(null);
  // useEffect(async () => {
  //   const fetchedImages = await getGallery(postData.slug);
  //   console.log(fetchedData);
  //   setImages(fetchedImages);
  // });
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
        {gallery ? <Gallery images={gallery} /> : null}
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
  let [
    gallery320,
    gallery480,
    gallery768,
    gallery1366,
    gallery1440,
    gallery1920,
    gallery4k,
  ] = await Promise.all([
    getGallery(params.post, "GALLERY_320"),
    getGallery(params.post, "GALLERY_480"),
    getGallery(params.post, "GALLERY_768"),
    getGallery(params.post, "GALLERY_1366"),
    getGallery(params.post, "GALLERY_1440"),
    getGallery(params.post, "GALLERY_1920"),
    getGallery(params.post, "GALLERY_4K"),
  ]);

  const data = await getPost(params.post);
  return {
    props: {
      postData: data,
      gallery: {
        gallery320,
        gallery480,
        gallery768,
        gallery1366,
        gallery1440,
        gallery1920,
        gallery4k,
      },
    },
  };
}
