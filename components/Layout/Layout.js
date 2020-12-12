import Head from "next/head";

import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

import classes from "./Layout.module.css";

const layout = (props) => (
  <div className={classes.Layout}>
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
    </Head>
    <div className={classes.Content}>
      <Menu {...props} />
      {props.children}
    </div>
    <Footer />
  </div>
);

export default layout;
