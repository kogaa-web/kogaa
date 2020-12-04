import Head from "next/head";
import classes from "./Layout.module.css";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

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

    <Menu {...props} />
    {props.children}
    <Footer />
  </div>
);

export default layout;
