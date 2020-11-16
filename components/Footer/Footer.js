import classes from "./Footer.module.css";

const footer = () => (
  <footer className={classes.Footer}>
    <hr />
    <div className={classes.Links}>
      <a href="#">Instagram</a>
      <a href="#">Facebook</a>
      <a href="#">Linkedin</a>
      <a href="mailto:office@kogaa.eu">office@kogaa.eu</a>
      <p className={classes.CopyrightMobile}>© 2020 KOGAA</p>
      <p className={classes.CopyrightDesktop}>© 2020 KOGAA Studio</p>
    </div>
  </footer>
);

export default footer;
