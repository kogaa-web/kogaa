import Footer from "../Footer/Footer";
import classes from "./Layout.module.css";

export default function layout(props) {
  return (
    <div className={classes.Layout}>
      {props.children}
      <Footer />
    </div>
  );
}
