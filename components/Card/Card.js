import classes from "./Card.module.css";
import { formatDate } from "../../lib/util";

export default function card({ post }) {
  console.log(post);
  return (
    <div className={classes.Card}>
      {post.featuredImage ? (
        <img src={post.featuredImage.node.sourceUrl} alt={post.title} />
      ) : null}
      <p>{formatDate(post.date)}</p>
      <h2>{post.title}</h2>
      <p>{post.excerpt.replace(/(<([^>]+)>)/gi, "")}</p>
    </div>
  );
}
