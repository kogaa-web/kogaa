import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";

import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

import classes from "./Layout.module.css";

const Layout = (props) => {
  const [prevScroll, setPrevScroll] = useState(
    process.browser ? window.scrollY : 0
  );
  const [style, setStyle] = useState({});
  const ref = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  // Get menu height
  useEffect(() => {
    setMenuHeight(ref.current.clientHeight);
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
    const menuScrollStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      minHeight: 0,
      transform: "translate(0, 0)",
    };

    const scrollPosition = window.scrollY;
    if (scrollPosition > menuHeight) {
      if (scrollPosition < prevScroll) {
        setStyle((prevStyle) => ({
          ...prevStyle,
          ...menuScrollStyle,
          top: "0%",
        }));
      } else {
        setStyle((prevStyle) => ({
          ...prevStyle,
          ...menuScrollStyle,
          top: "-100%",
        }));
      }
      setStyle((prevStyle) => ({
        ...prevStyle,
        transition: "top 0.8s ease-out",
      }));
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
        <meta property="og:title" content="KOGAA new web is out" />
        <meta property="og:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:description"
          content="KOGAA’s works, activities, and accomplishments in a nutshell"
        />
        <meta
          property="og:image:alt"
          content="KOGAA’s works, activities, and accomplishments in a nutshell"
        />
        <meta property="og:url" content="https://www.kogaa.eu" />
        <meta
          property="og:image"
          content="https://admin.kogaa.eu/wp-content/uploads/2021/01/kogaa-open-graph.jpg"
        />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-LM24JH3WGJ"
      />
      <Script
        id="gtagScript"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || []; function gtag()
      {dataLayer.push(arguments)}
      gtag("js", new Date()); gtag("config", "G-LM24JH3WGJ");
        `,
        }}
      />
      <div style={style} className={classes.MenuContainer}>
        <div className={classes.Layout}>
          <Menu ref={ref} {...props} />
        </div>
      </div>
      <div
        className={
          props.error
            ? `${classes.Layout} ${classes.ErrorContainer}`
            : `${classes.Layout} ${classes.ContentContainer}`
        }
      >
        <div className={classes.Content}>{props.children}</div>
        <Footer hideLine={props.hideLine} />
      </div>
    </>
  );
};

export default Layout;
