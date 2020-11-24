import { useState, useCallback, useEffect } from "react";
import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setFullscreen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const nextImage = () => {
    if (index !== images.length - 1) {
      setIndex(index + 1);
    }
  };

  const previousImage = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

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
      <button className={classes.Previous} onClick={previousImage} />
      <button
        className={classes.FullscreenButton}
        onClick={() => setFullscreen(true)}
      />
      <button className={classes.Next} onClick={nextImage} />
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
      {fullscreen ? <div className={classes.Fullscreen}></div> : null}
    </div>
  );
}
