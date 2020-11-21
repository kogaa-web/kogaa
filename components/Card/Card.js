import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import classes from "./Card.module.css";
import globalClasses from "../../styles/Global.module.css";
import { formatDate } from "../../lib/util";

export default function card({ post }) {
  const [loaded, setLoaded] = useState(false);
  const image = useRef();

  if (!post.featuredImage) {
    setLoaded(true);
  }

  const cardClasses = [classes.Card];
  if (post.contentType.node.name === "about") {
    cardClasses.push(classes.Triangle);
  }
  if (post.contentType.node.name === "news") {
    cardClasses.push(classes.Circle);
  }

  useEffect(() => {
    if (image.current.complete) {
      setLoaded(true);
    }
  }, []);

  if (!post.featuredImage) {
    setLoaded(true);
  }

  return (
    <div className={cardClasses.join(" ")}>
      {post.featuredImage ? (
        <Link href={`/${post.slug}`}>
          <a>
            <img
              ref={image}
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              onLoad={() => setLoaded(true)}
            />
          </a>
        </Link>
      ) : null}

      {loaded ? (
        <>
          <div className={globalClasses.Flex}>
            <p className={classes.Date}>{formatDate(post.date)}</p>
            <p className={classes.Category}>events</p>
          </div>
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
