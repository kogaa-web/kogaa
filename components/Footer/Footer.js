import { motion } from "framer-motion";
import { fadeIn } from "../../lib/animations";
import classes from "./Footer.module.css";

const footer = () => (
  <motion.footer className={classes.Footer} {...fadeIn}>
    <div className={classes.Social}>
      <a href="#">Instagram</a>
      <a href="#">Facebook</a>
      <a href="#">Linkedin</a>
      <a className={classes.EmailDesktop} href="mailto:office@kogaa.eu">
        office@kogaa.eu
      </a>
      <div className={classes.CopyrightMobile}>
        <a href="mailto:office@kogaa.eu">office@kogaa.eu</a>
        <p>© 2020 KOGAA</p>
      </div>
      <p className={classes.CopyrightDesktop}>© 2020 KOGAA Studio</p>
    </div>
  </motion.footer>
);

export default footer;
