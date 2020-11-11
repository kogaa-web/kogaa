import Link from "next/link";

import classes from "./Card.module.css";
import { formatDate } from "../../lib/util";

export default function card({ post }) {
  console.log(post);
  return (
    <div className={classes.Card}>
      {post.featuredImage ? (
        <Link href={`/${post.slug}`}>
          <a>
            <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
          </a>
        </Link>
      ) : null}
      <p>{formatDate(post.date)}</p>
      <Link href={`/${post.slug}`}>
        <a>
          <h2>{post.title}</h2>
        </a>
      </Link>
      <p>{post.excerpt.replace(/(<([^>]+)>)/gi, "")}</p>
    </div>
  );
}
