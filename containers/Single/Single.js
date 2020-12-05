import { useRouter } from "next/router";
import Head from "next/head";

import { getCategories, capitalize } from "../../lib/util";
import { useWindowSize } from "../../lib/hooks";

import Layout from "../../components/Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";
import Table from "../../components/Table/Table";
import Line from "../../components/Line/Line";

import styles from "../Category/Category.module.css";
import singleStyles from "./Single.module.css";

export default function Single({ postData, gallery, subcategories }) {
  const postSubcategories = getCategories(postData);

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
        <title>{`KOGAA - ${capitalize(postData.contentType.node.name)} - ${
          postData.title
        }`}</title>
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
        <div className={singleStyles.Columns}>
          <div
            className={singleStyles.LeftColumn}
            dangerouslySetInnerHTML={{
              __html: postData.columns.columns.leftColumn,
            }}
          />
          <div
            className={singleStyles.RightColumn}
            dangerouslySetInnerHTML={{
              __html: postData.columns.columns.rightColumn,
            }}
          />
        </div>
        {postData.button.buttonLink ? (
          <a
            className={singleStyles.Button}
            href={postData.button.buttonLink}
            target="_blank"
          >
            media package
          </a>
        ) : (
          <Line />
        )}
      </Layout>
    </div>
  );
}
