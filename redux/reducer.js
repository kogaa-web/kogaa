import { HYDRATE } from "next-redux-wrapper";
import * as t from "./types";

const reducer = (state = { posts: null }, action) => {
  switch (action.type) {
    case t.SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export default reducer;
