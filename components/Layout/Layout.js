import { useState, useEffect } from "react";
import Head from "next/head";

import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

import classes from "./Layout.module.css";

const layout = (props) => {
  const [prevScroll, setPrevScroll] = useState(0);
  const [style, setStyle] = useState({
    transition: "top 0.3s !important",
    height: "auto",
  });

  // Adding and removing scroll handler
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  });

  // Detecting scroll to bottom of the page
  const onScrollHandler = () => {
    const scrollPosition = window.scrollY;
    console.log(scrollPosition, prevScroll);
    if (scrollPosition > 200) {
      if (scrollPosition < prevScroll) {
        setStyle({
          zIndex: 10,
          transition: "top 0.3s !important",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "auto",
        });
      } else {
        setStyle({
          zIndex: 10,
          transition: "top 0.3s !important",
          position: "fixed",
          top: "-100%",
          left: 0,
          right: 0,
          height: "auto",
        });
      }
    } else {
      setStyle({
        transition: "top 0.3s !important",
        height: "auto",
      });
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
      <div className={classes.Layout} style={style}>
        <Menu {...props} />
      </div>
      <div className={classes.Layout}>
        <div className={classes.Content}>{props.children}</div>
        <Footer hideLine={props.hideLine} />
      </div>
    </>
  );
};

export default layout;
