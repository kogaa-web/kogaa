import React from "react";
import Router from "next/router";
import { AnimateSharedLayout } from "framer-motion";
import { Provider } from "react-redux";
import { Kumbh_Sans } from "next/font/google";

import NProgress from "nprogress"; //nprogress module
import "../styles/nprogress.css"; //styles of nprogress
import { useStore } from "../redux/store";

import "../styles/globals.css";

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
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AnimateSharedLayout>
        <div className={kumbhSans.className}>
          <Component {...pageProps} />
        </div>
      </AnimateSharedLayout>
    </Provider>
  );
}
