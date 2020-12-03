import reducer from "./reducer";
import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

// create a makeStore function
const makeStore = (context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
