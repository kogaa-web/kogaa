import classes from "./Menu.module.css";
import Logo from "../../assets/kogaa-logo.svg";
import Circle from "../../assets/circle.svg";
import Square from "../../assets/square.svg";
import Triangle from "../../assets/triangle.svg";

export default function menu() {
  return (
    <div className={classes.MainMenu}>
      <Logo />
      <Circle className={classes.Active} />
      <Square />
      <Triangle />
    </div>
  );
}
