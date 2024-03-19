import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";

import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";

import { getPosts } from "../../lib/api/listing";
import globalStyles from "../../styles/Global.module.css";
import styles from "./Category.module.css";
import { ScrollRestorationContext } from "../../lib/ScrollRestorationProvider";
import { set } from "nprogress";

const Category = ({ subcategories, allPosts }) => {
  const router = useRouter();

  const [posts, setPosts] = useState(allPosts.edges);
  const [hasNextPage, setHasNextPage] = useState(allPosts.pageInfo.hasNextPage);
  const [endCursor, setEndCursor] = useState(allPosts.pageInfo.endCursor);
  const { setScrollPosition, scrollPosition } = useContext(
    ScrollRestorationContext
  );

  // Sets posts on page change
  useEffect(() => {
    setPosts(allPosts.edges);
    setHasNextPage(allPosts.pageInfo.hasNextPage);
    setEndCursor(allPosts.pageInfo.endCursor);
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(null);
    }
  }, [router.query]);

  useEffect(() => {
    function loadMorePosts() {
      if (!hasNextPage) return;
      getPosts(router.query.category, endCursor).then((data) => {
        setPosts([...posts, ...data.edges]);
        setHasNextPage(data.pageInfo.hasNextPage);
        setEndCursor(data.pageInfo.endCursor);
      });
    }
    const loadMoreEl = document.querySelector("#loadMore");
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMorePosts();
      }
    });
    observer.observe(loadMoreEl);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, endCursor, posts, router.query]);

  return (
    <div className={styles.container}>
      <Layout subcategories={subcategories}>
        <div
          className={
            true ? [styles.Cards, globalStyles.FadeIn].join(" ") : styles.Cards
          }
        >
          {posts.map(({ node }, i) => {
            return (
              <Fragment key={node.id}>
                {node.featuredImage && <Card post={node} />}
              </Fragment>
            );
          })}
        </div>
        <div id="loadMore" />
      </Layout>
    </div>
  );
};

export default Category;
