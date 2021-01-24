import * as t from "./types";

export const setReduxPosts = (posts) => ({
  type: t.SET_POSTS,
  payload: posts,
});

export const setReduxScroll = (scrollPosition) => ({
  type: t.SET_SCROLL,
  payload: scrollPosition,
});
