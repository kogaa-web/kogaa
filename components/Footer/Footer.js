import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";

import Line from "../../components/Line/Line";

import classes from "./Footer.module.css";

const footer = ({ hideLine }) => {
  const desktopFBLink = "https://www.facebook.com/kogaa.studio/";
  const androidFBLink = "fb://page/822031704526911";
  const iosFBLink = "fb://page/?id=822031704526911";

  return (
    <motion.footer className={classes.Footer} {...fadeIn}>
      {!hideLine ? <Line /> : null}
      <div className={classes.Social}>
        <a href="https://www.instagram.com/kogaa_studio" target="_blank">
          Instagram
        </a>
        <a href={desktopFBLink} target="_blank">
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
