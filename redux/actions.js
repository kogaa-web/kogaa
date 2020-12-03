import * as t from "./types";

export const setReduxPosts = (posts) => ({
  type: t.SET_POSTS,
  payload: posts,
});
