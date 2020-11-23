import { useState } from "react";
import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  const [index, setIndex] = useState(0);
  return (
    <div className={classes.Gallery}>
      <div className={classes.Images}>
        {images.map((image, number) => {
          return (
            <img
              key={image.sourceUrl}
              src={image.sourceUrl}
              alt=""
              className={
                number === index ? classes.ActiveImage : classes.InactiveImage
              }
            />
          );
        })}
      </div>
      <div className={classes.Indicators}>
        {images.map((image, number) => {
          return (
            <button
              key={image.sourceUrl}
              onClick={() => setIndex(number)}
              className={number === index ? classes.Active : null}
            />
          );
        })}
      </div>
    </div>
  );
}
