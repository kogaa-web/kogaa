import { useState, useCallback, useEffect, useRef } from "react";
import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);

  let galleryImages = null;
  const windowWidth = useWindowSize().width;
  console.log(windowWidth);
  if (windowWidth <= 320) {
    galleryImages = images.gallery320;
  } else if (windowWidth <= 480) {
    galleryImages = images.gallery480;
  } else if (windowWidth <= 768) {
    galleryImages = images.gallery768;
  } else if (windowWidth <= 1366) {
    galleryImages = images.gallery1366;
  } else if (windowWidth <= 1440) {
    galleryImages = images.gallery1440;
  } else if (windowWidth <= 1920) {
    galleryImages = images.gallery1920;
  } else if (windowWidth <= 1366) {
    galleryImages = images.gallery1920;
  } else {
    galleryImages = images.gallery4k;
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
