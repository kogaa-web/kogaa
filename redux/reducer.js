import * as t from "./types";

const reducer = (state = { posts: null, scroll: 0, back: null }, action) => {
  switch (action.type) {
    case t.SET_POSTS:
      return { ...state, posts: action.payload };
    case t.SET_SCROLL:
      return { ...state, scroll: action.payload };
    case t.SET_BACK:
      return { ...state, back: action.payload };
    default:
      return state;
  }
};

export default reducer;
