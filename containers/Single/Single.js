import { useWindowSize } from "../../lib/hooks";

import { useRouter } from "next/router";
import Head from "next/head";

import { getCategories } from "../../lib/util";

import Layout from "../../components/Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";
import Table from "../../components/Table/Table";

import styles from "../../styles/Home.module.css";
import singleStyles from "./Single.module.css";

export default function Single({ postData, gallery, subcategories }) {
  const postSubcategories = getCategories(postData);
  console.log(postData);

  const windowWidth = useWindowSize().width;
  let images = null;
  if (windowWidth <= 320) {
    images = gallery.gallery320;
  } else if (windowWidth <= 480) {
    images = gallery.gallery480;
  } else if (windowWidth <= 768) {
    images = gallery.gallery768;
  } else if (windowWidth <= 1366) {
    images = gallery.gallery1366;
  } else if (windowWidth <= 1440) {
    images = gallery.gallery1440;
  } else if (windowWidth <= 1920) {
    images = gallery.gallery1920;
  } else if (windowWidth <= 1366) {
    images = gallery.gallery1920;
  } else if (windowWidth > 1366) {
    images = gallery.gallery4k;
  }

  const router = useRouter();
  if ((!router.isFallback && !postData?.slug) || !postData) {
    return <p>post error</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        subcategories={subcategories}
        postSubcategories={postSubcategories}
        postCategory={postData.contentType.node.name}
        date={postData.date}
      >
        {images ? <Gallery images={images} /> : null}
        <h1>{postData.title}</h1>
        {postData.table.table ? <Table data={postData.table.table} /> : null}
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
