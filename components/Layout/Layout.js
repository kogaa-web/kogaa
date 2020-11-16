import classes from "./Layout.module.css";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";

export default function layout(props) {
  return (
    <div className={classes.Layout}>
      <Menu />
      {props.children}
      <Footer />
    </div>
  );
}
