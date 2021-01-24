import * as t from "./types";

export const setReduxPosts = (posts) => ({
  type: t.SET_POSTS,
  payload: posts,
});

export const setReduxScroll = (scrollPosition) => ({
  type: t.SET_SCROLL,
  payload: scrollPosition,
});

export const setReduxBack = (back) => ({
  type: t.SET_BACK,
  payload: back,
});
