import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

import classes from "./Layout.module.css";

const layout = (props) => {
  const [prevScroll, setPrevScroll] = useState(
    process.browser ? window.scrollY : 0
  );
  const [style, setStyle] = useState({
    transition: "top 0.3s !important",
    height: "auto",
  });
  const ref = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  // Get menu height
  useEffect(() => {
    setMenuHeight(ref.current.clientHeight);
  }, []);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > menuHeight) {
      if (scrollPosition < prevScroll) {
        setStyle({
          zIndex: 10,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          minHeight: 0,
        });
      } else {
        setStyle({
          zIndex: 10,
          position: "fixed",
          top: "-100%",
          left: 0,
          right: 0,
          minHeight: 0,
        });
      }
    } else {
      setStyle({});
    }
    setPrevScroll(scrollPosition);
  };
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#EF4123" />
        <meta name="msapplication-TileColor" content="#EF4123" />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LM24JH3WGJ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || []; function gtag()
      {dataLayer.push(arguments)}
      gtag("js", new Date()); gtag("config", "G-LM24JH3WGJ");
        `,
          }}
        />
      </Head>
      <div
        style={style}
        className={
          props.error
            ? `${classes.Layout} ${classes.MenuContainer} ${classes.ErrorContainer}`
            : `${classes.Layout} ${classes.MenuContainer}`
        }
      >
        <Menu ref={ref} {...props} />
      </div>
      <div className={classes.Layout}>
        <div className={classes.Content}>{props.children}</div>
        <Footer hideLine={props.hideLine} />
      </div>
    </>
  );
};

export default layout;
