import { useState, useCallback, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import CSSTransition from "react-transition-group/CSSTransition";

import classes from "./Gallery.module.css";

export default function gallery({ images }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  const ref = useRef(null);

  // Handling swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => previousImage(),
    onSwipedDown: () => disableFullscreen(),
  });

  const fullscreenSwipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => previousImage(),
  });

  const disableFullscreenSwipe = useSwipeable({
    onSwipedDown: () => disableFullscreen(),
  });

  // Handling keyboard
  useEffect(() => {
    indexRef.current = index;
    document.addEventListener("keydown", keyPressHandler, false);
    return () => {
      document.removeEventListener("keydown", keyPressHandler, false);
    };
  }, [index]);

  const keyPressHandler = useCallback((event) => {
    switch (event.keyCode) {
      case 27:
        // Esc
        disableFullscreen();
        break;
      case 39:
        // Right arrow
        nextImage();
        break;
      case 37:
        // Left arrow
        previousImage();
        break;
      default:
        break;
    }
  }, []);

  const nextImage = () => {
    console.log("next");
    if (indexRef.current !== images.length - 1) {
      setIndex(indexRef.current + 1);
    }
  };

  const previousImage = () => {
    console.log("previous");
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
      {images.map((image, number) => {
        return (
          <img
            ref={ref}
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
      <div className={classes.Container} {...swipeHandlers}>
        <div className={classes.Gallery}>
          <div className={classes.Images}>{sliderImages}</div>
          <button className={classes.Previous} onClick={previousImage} />
          <button
            className={classes.FullscreenButton}
            onClick={enableFullscreen}
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
        </div>
      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={fullscreen}
        timeout={300}
        classNames={{
          enter: classes.FullscreenClosed,
          enterActive: classes.FullscreenOpen,
          exitActive: classes.FullscreenClosed,
        }}
      >
        <div className={classes.Fullscreen} {...disableFullscreenSwipe}>
          <div onClick={disableFullscreen} className={classes.Backdrop} />
          <div
            className={classes.FullscreenContent}
            {...fullscreenSwipeHandlers}
          >
            <div className={classes.Images}>{sliderImages}</div>
            <button className={classes.Previous} onClick={previousImage} />
            <button className={classes.Next} onClick={nextImage} />
            <img src={images[0].sourceUrl} className={classes.Placeholder} />
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
