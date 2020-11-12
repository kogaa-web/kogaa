import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  return (
    <div className={classes.Gallery}>
      {images.map((image) => {
        return <img key={image.sourceUrl} src={image.sourceUrl} alt="" />;
      })}
    </div>
  );
}
