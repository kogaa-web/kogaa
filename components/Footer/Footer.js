import classes from "./Footer.module.css";

const footer = () => (
  <footer className={classes.Footer}>
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
  </footer>
);

export default footer;
