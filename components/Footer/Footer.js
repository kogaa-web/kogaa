import classes from "./Footer.module.css";

const footer = () => (
  <footer className={classes.Footer}>
    <hr />
    <a href="#">Instagram</a>
    <a href="#">Facebook</a>
    <a href="#">Linkedin</a>
    <a href="mailto:office@kogaa.eu">office@kogaa.eu</a>
    <p>© 2020 KOGAA Studio</p>
  </footer>
);

export default footer;
