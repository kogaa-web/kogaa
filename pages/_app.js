import React from "react";
import Router from "next/router";
import { AnimateSharedLayout } from "framer-motion";

import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css"; //styles of nprogress

import { wrapper } from "../redux/store";
import App from "next/app";
import "../styles/globals.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({
  showSpinner: false,
});

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    );
  }
}

export default wrapper.withRedux(MyApp);
