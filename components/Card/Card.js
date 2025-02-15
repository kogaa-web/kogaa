import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { formatDate, getCategories } from "../../lib/util";

import { ScrollRestorationContext } from "../../lib/ScrollRestorationProvider";
import globalClasses from "../../styles/Global.module.css";
import classes from "./Card.module.css";

const Card = forwardRef(({ post }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const { setScrollPosition } = useContext(ScrollRestorationContext);
  const image = useRef();

  const categories = getCategories(post);

  const cardClasses = [classes.Card];
  if (post.contentType.node.name === "about") {
    cardClasses.push(classes.Triangle);
  }
  if (post.contentType.node.name === "news") {
    cardClasses.push(classes.Circle);
  }

  // Load text only when image is loaded for smooth animation of appearing
  useEffect(() => {
    if (image.current.complete) {
      setLoaded(true);
    }
  }, []);

  let cardImage = null;
  if (post.featuredImage) {
    cardImage = (
      <Link href={`/${post.contentType.node.name}/${post.slug}`}>
        <Image
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          ref={image}
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          onLoad={() => setLoaded(true)}
        />
      </Link>
    );
    if (post.contentType.node.name === "about") {
      cardImage = (
        <div className={classes.TriangleContainer}>
          <div className={classes.TriangleContent}>
            <Link href={`/${post.contentType.node.name}/${post.slug}`}>
              <Image
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
                ref={image}
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                onLoad={() => setLoaded(true)}
              />
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      ref={ref}
      className={cardClasses.join(" ")}
      id={post.id}
      onClick={() => {
        setScrollPosition(window.scrollY);
      }}
    >
      {cardImage}
      {loaded ? (
        <>
          <div className={[globalClasses.Flex, classes.Info].join(" ")}>
            <p className={classes.Date}>{formatDate(post.date)}</p>
            <div className={classes.Categories}>
              {categories.map((category, index) => {
                return (
                  <Fragment key={category.name}>
                    <Link
                      href={`/${post.contentType.node.name}/${category.name}`}
                    >
                      {category.name}
                    </Link>
                    {categories[index + 1] && "|"}
                  </Fragment>
                );
              })}
            </div>
          </div>
          <Link href={`/${post.contentType.node.name}/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          <p className={classes.Excerpt}>
            {post.excerpt.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </>
      ) : null}
    </div>
  );
});
export default Card;
