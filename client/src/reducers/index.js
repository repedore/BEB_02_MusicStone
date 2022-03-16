import { combineReducers } from "redux";
import testReducer from "./testReducer";
import accountReducer from "./accountReducer";

const rootReducer = combineReducers({
  testReducer,
  accountReducer,
});

export default rootReducer;
