import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";
import { connect } from "react-redux";

import { getCategories, capitalize } from "../../lib/util";
import { useWindowSize } from "../../lib/hooks";
import { fadeIn } from "../../lib/animations";
import * as actions from "../../redux/actions";

import Layout from "../../components/Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";
import Table from "../../components/Table/Table";
import Line from "../../components/Line/Line";

import styles from "../Category/Category.module.css";
import singleStyles from "./Single.module.css";

const Single = ({ postData, gallery, subcategories, setReduxPosts }) => {
  useEffect(() => {
    setReduxPosts(null);
  }, []);

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
        <motion.div {...fadeIn}>
          <h1>{postData.title}</h1>
          {postData.table.table && postData.table.insert ? (
            <Table data={postData.table.table} />
          ) : null}
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
          {postData.button.insertButton &&
          postData.button.buttonLink &&
          postData.button.buttonText ? (
            <a
              className={singleStyles.Button}
              href={postData.button.buttonLink}
              target="_blank"
            >
              {postData.button.buttonText}
            </a>
          ) : (
            <Line />
          )}
        </motion.div>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
});

export default connect(null, mapDispatchToProps)(Single);
