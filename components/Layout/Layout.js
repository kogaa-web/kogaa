import classes from "./Layout.module.css";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

const layout = (props) => (
  <div className={classes.Layout}>
    <Menu {...props} />
    {props.children}
    <Footer />
  </div>
);

export default layout;
