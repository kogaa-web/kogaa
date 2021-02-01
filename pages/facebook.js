import { useEffect } from "react";

import { iOS, Android } from "../lib/util";

const Facebook = () => {
  useEffect(() => {
    if (process.browser) {
      window.onload = () => {
        const desktopLink = "https://www.facebook.com/kogaa.studio/";
        const androidLink = "fb://page/822031704526911";
        const iosLink = "fb://page/?id=822031704526911";

        if (iOS()) {
          window.location = iosLink;
          window.setTimeout(() => {
            window.location = desktopLink;
          }, 25);
        } else if (Android()) {
          window.location = androidLink;
          window.setTimeout(() => {
            window.location = desktopLink;
          }, 25);
        } else {
          window.location = desktopLink;
        }

        const killPopup = () => {
          window.removeEventListener("pagehide", killPopup);
        };

        window.addEventListener("pagehide", killPopup);
      };
    }
  }, []);
  return null;
};

export default Facebook;
