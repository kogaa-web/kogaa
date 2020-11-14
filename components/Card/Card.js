import Link from "next/link";
import { useState, useCallback } from "react";

import classes from "./Card.module.css";
import { formatDate } from "../../lib/util";

export default function card({ post }) {
  const [loaded, setLoaded] = useState(false);
  if (!post.featuredImage) {
    setLoaded(true);
  }
  let imageClass = classes.Circle;
  if (post.contentType.node.name === "architects") {
    imageClass = classes.Triangle;
  }

  const onLoad = useCallback(() => {
    console.log("loaded");
    setLoaded(true);
  }, []);

  return (
    <div className={classes.Card}>
      <Link href={`/${post.slug}`}>
        <a>
          <img
            className={imageClass}
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            onLoad={onLoad}
          />
        </a>
      </Link>

      {loaded ? (
        <>
          <p className={classes.Date}>{formatDate(post.date)}</p>
          <Link href={`/${post.slug}`}>
            <a>
              <h2>{post.title}</h2>
            </a>
          </Link>
          <p className={classes.Excerpt}>
            {post.excerpt.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </>
      ) : null}
    </div>
  );
}
