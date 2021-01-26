import { useEffect } from "react";
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

import styles from "../Category/Category.module.css";
import singleStyles from "./Single.module.css";

const Single = ({
  postData,
  gallery,
  subcategories,
  setReduxPosts,
  setReduxScroll,
  reduxScroll,
}) => {
  useEffect(() => {
    //setReduxPosts(null);
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

  let showButton = false;
  if (
    postData.button.insertButton &&
    postData.button.buttonLink &&
    postData.button.buttonText
  ) {
    showButton = true;
  }

  // Open all links in a new tab
  let leftColumn = postData.columns.columns.leftColumn;
  let rightColumn = postData.columns.columns.rightColumn;
  if (leftColumn) {
    leftColumn = leftColumn.replace("<a ", '<a target="_blank" ');
  }
  if (rightColumn) {
    rightColumn = rightColumn.replace("<a ", '<a target="_blank" ');
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
        hideLine={showButton}
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
                __html: leftColumn,
              }}
            />
            <div
              className={singleStyles.RightColumn}
              dangerouslySetInnerHTML={{
                __html: rightColumn,
              }}
            />
          </div>
          {showButton ? (
            <a
              className={singleStyles.Button}
              href={postData.button.buttonLink}
              target="_blank"
            >
              {postData.button.buttonText}
            </a>
          ) : null}
        </motion.div>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setReduxPosts: (posts) => dispatch(actions.setReduxPosts(posts)),
});

export default connect(null, mapDispatchToProps)(Single);
