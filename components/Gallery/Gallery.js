import { useState, useCallback, useEffect, useRef } from "react";
import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);

  let windowWidth = null;
  if (typeof window !== "undefined") {
    let windowWidth = window.innerHeight;
    console.log(windowWidth);
  }

  let galleryImages = useWindowSize().width;
  switch (windowWidth) {
    case windowWidth < 320:
      galleryImages = images.gallery320;
      break;

    default:
      galleryImages = images.gallery4k;
      break;
  }
  console.log(galleryImages);

  useEffect(() => {
    indexRef.current = index;
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [index]);

  const escFunction = useCallback((event) => {
    switch (event.keyCode) {
      case 27:
        disableFullscreen();
        break;
      case 39:
        nextImage();
        break;
      case 37:
        previousImage();
        break;
      default:
        break;
    }
  }, []);

  const nextImage = () => {
    if (indexRef.current !== galleryImages.length - 1) {
      setIndex(indexRef.current + 1);
    }
  };

  const previousImage = () => {
    if (indexRef.current !== 0) {
      setIndex(indexRef.current - 1);
    }
  };

  const enableFullscreen = () => {
    document.documentElement.style.overflow = "hidden"; // firefox, chrome
    document.body.scroll = "no"; // ie only
    setFullscreen(true);
  };

  const disableFullscreen = () => {
    document.documentElement.style.overflow = "auto"; // firefox, chrome
    document.body.scroll = "yes"; // ie only
    setFullscreen(false);
  };

  const sliderImages = (
    <>
      {galleryImages.map((image, number) => {
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
    </>
  );

  return (
    <>
      <div className={classes.Gallery}>
        <div className={classes.Images}>{sliderImages}</div>
        <button className={classes.Previous} onClick={previousImage} />
        <button
          className={classes.FullscreenButton}
          onClick={enableFullscreen}
        />
        <button className={classes.Next} onClick={nextImage} />
        <div className={classes.Indicators}>
          {galleryImages.map((image, number) => {
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
      {fullscreen ? (
        <div className={classes.Fullscreen}>
          <div className={classes.Images}>{sliderImages}</div>
          <button className={classes.Previous} onClick={previousImage} />
          <button className={classes.Next} onClick={nextImage} />
        </div>
      ) : null}
    </>
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
