import { Kumbh_Sans } from "next/font/google";
import Router from "next/router";
import React from "react";

import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css"; //styles of nprogress

import "../styles/globals.css";
import { ScrollRestorationProvider } from "../lib/ScrollRestorationProvider";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({
  showSpinner: false,
});

const kumbhSans = Kumbh_Sans({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <ScrollRestorationProvider>
      <div className={kumbhSans.className}>
        <Component {...pageProps} />
      </div>
    </ScrollRestorationProvider>
  );
}
