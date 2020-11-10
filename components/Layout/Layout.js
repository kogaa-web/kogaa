import Footer from "../Footer/Footer";

export default function layout(props) {
  return (
    <div>
      {props.children}
      <Footer />
    </div>
  );
}
