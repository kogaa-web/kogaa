import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";
import { iOS, Android } from "../../lib/util";

import Line from "../../components/Line/Line";

import classes from "./Footer.module.css";
import { useEffect, useState } from "react";

const footer = ({ hideLine }) => {
  const [fbLink, setFbLink] = useState(
    "https://www.facebook.com/kogaa.studio/"
  );

  useEffect(() => {
    if (iOS()) {
      setFbLink("fb://page/?id=822031704526911");
    } else if (Android()) {
      setFbLink("fb://page/822031704526911");
    }
  }, []);

  return (
    <motion.footer className={classes.Footer} {...fadeIn}>
      {!hideLine ? <Line /> : null}
      <div className={classes.Social}>
        <a href="https://www.instagram.com/kogaa_studio" target="_blank">
          Instagram
        </a>
        <a href={fbLink} target="_blank">
          Facebook
        </a>
        <a href="https://www.linkedin.com/company/kogaa/" target="_blank">
          Linkedin
        </a>
        <a className={classes.EmailDesktop} href="mailto:office@kogaa.eu">
          office@kogaa.eu
        </a>
        <div className={classes.CopyrightMobile}>
          <a href="mailto:office@kogaa.eu">office@kogaa.eu</a>
          <p>© 2020 KOGAA</p>
        </div>
        <p className={classes.CopyrightDesktop}>© 2020 KOGAA studio</p>
      </div>
    </motion.footer>
  );
};
export default footer;
