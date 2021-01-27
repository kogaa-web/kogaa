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

export const setReduxHasNextPage = (hasNextPage) => ({
  type: t.SET_HAS_NEXT_PAGE,
  payload: hasNextPage,
});

export const setReduxEndCursor = (endCursor) => ({
  type: t.SET_END_CURSOR,
  payload: endCursor,
});

export const setReduxFromSingle = (fromSingle) => ({
  type: t.SET_FROM_SINGLE,
  payload: fromSingle,
});
